"""
API views for user registration, login, user profile management, and authentication.
"""
import os
import jwt


from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import PermissionDenied, AuthenticationFailed
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import (
    BasePermission,
    IsAdminUser,
)


from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import smart_str, smart_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.http import HttpResponsePermanentRedirect
from django.http import JsonResponse

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# pylint: disable=E0402
from .models import (
    UserProfile,
    Church,
    Event,
    Ministry,
    Image,
    PrayerRequest,
    Video,
    ChurchOfficial,
    Sermon,
)
from .renderers import UserRenderer
from .utils import Util
from .serializers import (
    RegisterSerializer,
    SetNewPasswordSerializer,
    ResetPasswordEmailRequestSerializer,
    EmailVerificationSerializer,
    LoginSerializer,
    LogoutSerializer,
    AllUserProfileSerializer,
    UserProfileSerializer,
    ChurchOfficialSerializer,
    EventSerializer,
    MinistrySerializer,
    ImageSerializer,
    VideoSerializer,
    PrayerRequestSerializer,
    SermonSerializer,
    ChurchSerializer,
)


class CustomRedirect(HttpResponsePermanentRedirect):
    """
     A custom HTTP permanent redirect response that
     allows specifying custom schemes in addition to
     'http' and 'https'.

    This class extends the
    `HttpResponsePermanentRedirect`
    class provided by Django to support
    redirecting to URLs with custom schemes.
    By default, it allows the 'http' and 'https'
    schemes, but you can add additional schemes by
    modifying the `allowed_schemes` list.

    Example:
    ```python
    # Create a custom redirect response that allows the 'myapp' scheme
    redirect_response = CustomRedirect("myapp://example.com")
    ```

    Attributes:
        allowed_schemes (list):
        A list of allowed URL schemes. By default,
        it includes the 'http' and 'https' schemes,
        but you can extend it with custom schemes as needed.
    """

    allowed_schemes = [os.environ.get("APP_SCHEME"), "http", "https"]


class RegisterView(generics.GenericAPIView):
    """
    User registration view with email verification.

    Attributes:
        serializer_class (Serializer): Serializer for user data.
        renderer_classes (tuple): Renderer classes for response format.

    Method:
        - post(request): Handle user registration and email verification.
    """

    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request):
        """
        Register a user and send email verification.

        Args:
            request (HttpRequest): User registration data.

        Returns:
            Response: Status and user data.
        """
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = UserProfile.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativelink = reverse("email-verify")
        absurl = "http://" + current_site + relativelink + "?token=" + str(token)
        email_body = (
            f"hellow {user.username}"
            + "please confirm your email"
            + " Use the link below to verify your email \n"
            + absurl
        )
        data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Verify your email to activate your account",
        }

        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    User login and token generation.

    API endpoint for user login. Authenticates users and generates JWT tokens for
    authorized users.

    Returns:
        Response: A JSON response with user authentication tokens and information.

    Raises:
        Response: A JSON response with error messages if login fails.
    """

    def post(self, request):
        """
        Log in a user and generate tokens.
        """
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            print(user)
            token = RefreshToken.for_user(user)
            # Set custom claims in the token payload
            token.payload["is_admin"] = user.is_admin
            response_data = {
                "refresh": str(token),
                "access": str(token.access_token),
                "admin": user.is_admin,
                "id": user.id,
                "verified": user.is_verified,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(views.APIView):
    """
    View for email verification.

    Attributes:
        serializer_class (Serializer): Serializer for email verification data.

    Method:
        - get(request): Verify the user's email using a token.
    """

    serializer_class = EmailVerificationSerializer
    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Description",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        """
        Verify the user's email using a token.

        Args:
            request (HttpRequest): HTTP request containing the email verification token.

        Returns:
            Response: Status and confirmation message.
        """
        token = request.GET.get("token")
        try:
            payload = jwt.decode(
                token, os.environ.get("SECRET_KEY"), algorithms=["HS256"]
            )
            user = UserProfile.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response(
                {"email": "Successfully activated"}, status=status.HTTP_200_OK
            )
        except jwt.exceptions.DecodeError as identifier:
            return Response(
                {"error": str(identifier)}, status=status.HTTP_400_BAD_REQUEST
            )


class RequestPasswordResetEmail(generics.GenericAPIView):
    """
    Request a password reset email.

    Attributes:
        serializer_class (Serializer): Serializer for password reset email request data.

    Method:
        - post(request): Request a password reset email.
    """

    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        """
        Request a password reset email.

        Args:
            request (HttpRequest): HTTP request with user email for password reset.

        Returns:
            Response: Status and success message.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get("email", "")

        if UserProfile.objects.filter(email=email).exists():
            user = UserProfile.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relative_link = reverse(
                "password-reset-confirm", kwargs={"uidb64": uidb64, "token": token}
            )
            redirect_url = os.environ.get("REDIRECT_URL")
            absurl = (
                "http://"
                + current_site
                + relative_link
                + "?redirect_url="
                + redirect_url
            )
            email_body = (
                "Hello, \n Use the link below to reset your password  \n" + absurl
            )
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Reset your password",
            }
            Util.send_email(data)
        return Response(
            {
                "success": "An email with the reset password link has been sent to your email"
            },
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheckAPI(GenericAPIView):
    """
    Check the validity of a password reset token.

    Attributes:
        serializer_class (Serializer): Serializer for setting a new password.

    Method:
        - get(request, uidb64, token): Check the validity of a password reset token.
    """

    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        """
        Check the validity of a password reset token.

        Args:
            request (HttpRequest): HTTP request with user token and UID.
            uidb64 (str): Base64-encoded user ID.
            token (str): Password reset token.

        Returns:
            JsonResponse: Status and validity information.
        """
        redirect_url = request.GET.get("redirect_url")
        try:
            userid = smart_str(urlsafe_base64_decode(uidb64))
            user = UserProfile.objects.get(id=userid)
            generator = PasswordResetTokenGenerator()

            # Check the token
            is_token_valid = generator.check_token(user, token)
            if not is_token_valid:
                error_message = (
                    "Invalid token1" if len(redirect_url) > 3 else "Invalid token2"
                )
                return JsonResponse({"error": error_message}, status=400)

            if redirect_url and len(redirect_url) > 3:
                response_data = {
                    "token_valid": True,
                    "message": "Credentials Valid",
                    "uidb64": uidb64,
                    "token": token,
                }
                return CustomRedirect(os.environ.get("FRONTEND_URL"))

            return Response(response_data)

        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=400)
        except Exception as e:
            error_message = "An error occurred"
            if str(e):
                error_message += f": {str(e)}"
            return JsonResponse({"error": error_message}, status=400)


class SetNewPasswordAPIView(generics.GenericAPIView):
    """
    Set a new password view.

    Attributes:
        serializer_class (Serializer): Serializer for setting a new password.

    Method:
        - patch(request): Set a new password and respond with success message.
    """

    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        """
        Set a new password and respond with a success message.

        This method processes a PATCH request containing data for setting a new password. It validates the input using the serializer and returns a success response upon successful password reset.

        Args:
            request (HttpRequest): The HTTP request object with new password data.

        Returns:
            Response: A response indicating a successful password reset.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password reset success"},
            status=status.HTTP_200_OK,
        )


class UserProfileListView(APIView):
    """
    List user profiles (admin-only).

    API endpoint to list user profiles. Only accessible to admin users.

    Returns:
        Response: A JSON response with user profiles if authorized.

    Raises:
        PermissionDenied: If a non-admin user attempts to access this resource.
        AuthenticationFailed: If authentication credentials are not provided.
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]  # Requires admin permission

    def get(self, request):
        """
        List user profiles (admin-only).
        """
        if request.user.is_authenticated:
            if request.user.is_admin:
                # Admin token
                user_profiles = UserProfile.objects.all()
                serializer = AllUserProfileSerializer(user_profiles, many=True)
                return Response(serializer.data)
            else:
                # Regular user token, raise Forbidden error
                raise PermissionDenied(
                    "You are not authorized to access this resource."
                )
        else:
            # User is not authenticated
            # Handle accordingly
            # For example, you can raise AuthenticationFailed error
            raise AuthenticationFailed("Authentication credentials were not provided.")


class IsAdminOrOwner(BasePermission):
    """
    Custom permission class to check if the user is an admin or the owner of an object.
    """

    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and (
            request.user.is_admin or obj == request.user
        )


class UserProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update, or delete user profiles.

    API endpoint to retrieve, update, or delete user profiles. Users can only access
    their own profile, while admin users have full access.

    Returns:
        Response: A JSON response with user profile data or status messages.

    Raises:
        PermissionDenied: If a user attempts to access another user's profile.
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminOrOwner]

    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve user profile.
        """
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """
        Update user profile (partial).
        """
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        """
        Delete user profile.
        """
        instance = self.get_object()
        self.check_object_permissions(request, instance)
        serializer = self.get_serializer(instance)
        serializer.delete(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LogoutAPIView(generics.GenericAPIView):
    """
    User logout view.

    Attributes:
        serializer_class (Serializer): Serializer for logging out.
        permission_classes (tuple): Permissions required for this view.

    Method:
        - post(request): Log the user out and return a no-content response.
    """

    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        """
        Log the user out and return a no-content response.

        This method handles user logout by processing a POST request. It validates the request using the serializer and logs the user out, then returns a no-content response to indicate a successful logout.

        Args:
            request (HttpRequest): The HTTP request object for user logout.

        Returns:
            Response: A no-content response indicating successful user logout.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class IsVerifiedAdminOrReadOnly(BasePermission):
    """
    Custom permission class to check if the user is a verified admin or has read-only access.
    """

    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS","PATCH"):
            return True

        return request.user.is_authenticated and  request.user.is_admin

    def has_object_permission(self, request, view, obj):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        return request.user.is_authenticated and request.user.is_verified and request.user.is_admin

class IsAuthenticatedAndIsOwnerOrReadOnly(BasePermission):
    """
    Custom permission class to check if the user is authenticated and is the owner of the object.
    Users can only update or delete their own objects.
    """

    def has_object_permission(self, request, view, obj):
        # Allow GET, HEAD, and OPTIONS requests for all users
        if request.method in ("GET", "HEAD", "OPTIONS"):
            return True

        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        # Check if the user is the owner of the object
        return obj.owner == request.user
class ChurchListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Church.objects.all()
    serializer_class = ChurchSerializer


class ChurchRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Church.objects.all()
    serializer_class = ChurchSerializer


class EventListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class MinistryListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer


class MinistryRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer


class ImageListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImageRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class VideoListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class VideoRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class PrayerRequestListCreateView(generics.ListCreateAPIView):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer


class PrayerRequestRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedAndIsOwnerOrReadOnly]
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer


class ChurchOfficialListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = ChurchOfficial.objects.all()
    serializer_class = ChurchOfficialSerializer


class ChurchOfficialRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = ChurchOfficial.objects.all()
    serializer_class = ChurchOfficialSerializer


class SermonListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer


class SermonRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsVerifiedAdminOrReadOnly]
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer
