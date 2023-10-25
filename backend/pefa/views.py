"""
API views for user registration, login, user profile management, and authentication.
"""
from rest_framework import generics, status, views, permissions
from .serializers import (
    RegisterSerializer,
    SetNewPasswordSerializer,
    ResetPasswordEmailRequestSerializer,
    EmailVerificationSerializer,
    LoginSerializer,
    LogoutSerializer,
    AllUserProfileSerializer,
    UserProfileSerializer,
)
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .renderers import UserRenderer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (
    smart_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect
import os


from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied, AuthenticationFailed
from rest_framework.permissions import (
    BasePermission,
    IsAdminUser,
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import UserProfile
from rest_framework.generics import GenericAPIView
from django.http import JsonResponse
class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = [os.environ.get("APP_SCHEME"), "http", "https"]

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = UserProfile.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse("email-verify")
        absurl = "http://" + current_site + relativeLink + "?token=" + str(token)
        email_body = (
            f"hellow"
            + user.username 
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
                "verified":user.is_verified
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Description",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, os.environ.get("SECRET_KEY"),algorithms=['HS256'])
            user = UserProfile.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response(
                {"email": "Successfully activated"}, status=status.HTTP_200_OK
            )
        except jwt.exceptions.DecodeError as identifier:
             return Response({"error": str(identifier)}, status=status.HTTP_400_BAD_REQUEST)



class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if UserProfile.objects.filter(email=email).exists():
            user = UserProfile.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})

            redirect_url = reverse('password-reset-complete')
            absurl = 'http://'+current_site + relativeLink + '?redirect_url=' + redirect_url
            email_body = 'Hello, \n Use the link below to reset your password  \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your password'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        redirect_url = request.GET.get("redirect_url")
        try:
            userid = smart_str(urlsafe_base64_decode(uidb64))
            user = UserProfile.objects.get(id=userid)
            generator = PasswordResetTokenGenerator()

            if not generator.check_token(user, token):
                if len(redirect_url) > 3:
                    return JsonResponse({f"error': 'Invalid token1 {redirect_url}"}, status=400)
                else:
                    return JsonResponse({f"error': 'Invalid token2{redirect_url}"}, status=400)

            if redirect_url and len(redirect_url) > 3:
                return JsonResponse({'token_valid': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token})
            else:
                return JsonResponse({'error': 'Invalid redirect URL'}, status=400)
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred', 'details': str(e)}, status=400)

        
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
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
    serializer_class = LogoutSerializer

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
