"""
API views for user registration, login, user profile management, and authentication.
"""

from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied, AuthenticationFailed
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import (
    BasePermission,
    IsAdminUser,
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import UserProfile
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    AllUserProfileSerializer,
    UserProfileSerializer,
)



class RegisterView(APIView):
    """
    Register new users.

    API endpoint for user registration. Allows users to register by providing
    necessary information.

    Returns:
        Response: A JSON response with user authentication tokens.

    Raises:
        Response: A JSON response with error messages if registration fails.
    """

    def post(self, request):
        """
        Register a new user.
        """
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                user.is_admin = False  # Set is_admin to False for regular users
                # Add any additional logic to determine if the user is an admin or not
                if user.is_admin:
                    user.is_admin = True  # Set is_admin to True for admin users
                user.save()

                token = RefreshToken.for_user(user)
                response_data = {
                    "refresh": str(token),
                    "access": str(token.access_token),
                    "admin": user.is_admin,
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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