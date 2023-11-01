"""
Module docstring: This module contains serializers for user profiles and related models.
"""

from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from .models import UserProfile
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

User = get_user_model()


class AllUserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model, including all fields.
    """

    class Meta:
        """
        Meta class for AllUserProfileSerializer with fields and model configuration.
        """

        model = UserProfile
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "profile_picture",
            "is_admin",
            "is_staff",
            "is_superuser",
            "is_active",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """

    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        """
        Meta class for RegisterSerializer with fields and model configuration.
        """

        model = UserProfile
        fields = ["email", "username", "first_name", "last_name", "password"]
        extra_kwargs = {
            "email": {"required": True},
            "username": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, validated_data):
        """
        Create and return a new user with encrypted password.
        """
        user = UserProfile.objects.create(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """

    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        """
        Meta class for LoginSerializer with field definitions.
        """

    def validate(self, attrs):
        """
        Validate user credentials.
        """
        user = authenticate(username=attrs["email"], password=attrs["password"])

        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("This user has been deactivated.")

        attrs["user"] = user
        return attrs

    def create(self, validated_data):
        # Placeholder method, can be left empty
        pass

    def update(self, instance, validated_data):
        # Placeholder method, can be left empty
        pass

class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    """
    Serializer for user logout.
    """

    refresh = serializers.CharField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = None

    class Meta:
        """
        Meta class for LogoutSerializer with field definitions.
        """

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def create(self, validated_data):
        # Placeholder method, can be left empty
        pass

    def update(self, instance, validated_data):
        # Placeholder method, can be left empty
        pass



class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model, used for updating and deleting user profiles.
    """

    class Meta:
        """
        Meta class for UserProfileSerializer with fields and model configuration.
        """

        model = UserProfile
        exclude = ['password']
        read_only_fields = ["id"]

    def update(self, instance, validated_data):
        """
        Update the UserProfile instance with the validated data.
        """
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.profile_picture = validated_data.get("profile_picture", instance.profile_picture)

        instance.save()
        return instance

    def delete(self, instance):
        """
        Delete the UserProfile instance.
        """
        instance.delete()