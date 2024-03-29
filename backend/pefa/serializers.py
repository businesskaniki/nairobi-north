"""
Module docstring: This module contains serializers for user profiles and related models.
"""

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import authenticate, get_user_model
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

# pylint: disable=E0402
from .models import (
    UserProfile,
    Church,
    Event,
    Ministry,
    Image,
    Video,
    PrayerRequest,
    ChurchOfficial,
    Sermon,
)

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
    """email verification serializer"""

    token = serializers.CharField(max_length=555)

    class Meta:
        """meta class"""

        model = User
        fields = ["token"]


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


# pylint: disable=W0223


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    """ "reset password serializer"""

    email = serializers.EmailField(min_length=2)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        """meta"""

        fields = ["email"]


# pylint: disable=W0223
class SetNewPasswordSerializer(serializers.Serializer):
    """
    Serializer for setting a new password after a password reset request.
    """

    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            token = attrs.get("token")
            uidb64 = attrs.get("uidb64")

            userid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=userid)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("The reset link is invalid", 401)

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise AuthenticationFailed("invalid link", 401) from e


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        try:
            refresh_token = attrs['refresh']
            RefreshToken(refresh_token).blacklist()
        except TokenError:
            raise serializers.ValidationError('Token is invalid or expired.')
        return attrs
    def create(self, validated_data):
        return None

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model, used for updating and deleting user profiles.
    """

    class Meta:
        """
        Meta class for UserProfileSerializer with fields and model configuration.
        """

        model = UserProfile
        exclude = ["password"]
        read_only_fields = ["id"]

    def update(self, instance, validated_data):
        """
        Update the UserProfile instance with the validated data.
        """
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.profile_picture = validated_data.get(
            "profile_picture", instance.profile_picture
        )

        instance.save()
        return instance

    def delete(self, instance):
        """
        Delete the UserProfile instance.
        """
        instance.delete()


class EventSerializer(serializers.ModelSerializer):
    church_name = serializers.SerializerMethodField()

    """
    serializer for the evnts"""

    class Meta:
        """meta class"""

        model = Event
        fields = (
            "id",
            "name",
            "poster",
            "date",
            "description",
            "location",
            "church",
            "church_name",
        )
        read_only_fields = ["id"]

    def get_church_name(self, obj):
        return obj.church.name if obj.church else None


class MinistrySerializer(serializers.ModelSerializer):
    """
    Serializer for the Ministry model.
    """

    class Meta:
        """meta class"""

        model = Ministry
        fields = "__all__"
        read_only_fields = ["id"]

    all_media = serializers.SerializerMethodField()

    def get_all_media(self, obj):
        return {
            "images": ImageSerializer(obj.get_all_media()["images"], many=True).data,
            "videos": VideoSerializer(obj.get_all_media()["videos"], many=True).data,
        }


class ImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the Image model.
    """

    class Meta:
        """meta class"""

        model = Image
        fields = "__all__"
        read_only_fields = ["id"]


class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Video model.
    """

    class Meta:
        """meta class"""

        model = Video
        fields = "__all__"
        read_only_fields = ["id"]


class PrayerRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for the PrayerRequest model.
    """

    class Meta:
        """meta class"""

        model = PrayerRequest
        fields = "__all__"
        read_only_fields = ["id"]


class ChurchOfficialSerializer(serializers.ModelSerializer):
    """
    Serializer for the ChurchOfficial model.
    """

    class Meta:
        """meta class"""

        model = ChurchOfficial
        fields = "__all__"
        read_only_fields = ["id"]


class SermonSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sermon model.
    """

    class Meta:
        """meta class"""

        model = Sermon
        fields = "__all__"
        read_only_fields = ["id"]


class ChurchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Church
        fields = "__all__"

    all_media = serializers.SerializerMethodField()
    all_ministries = serializers.SerializerMethodField()
    all_events = serializers.SerializerMethodField()
    all_church_officials = serializers.SerializerMethodField()
    all_sermons = serializers.SerializerMethodField()
    all_prayer_requests = serializers.SerializerMethodField()

    def get_all_media(self, obj):
        return {
            "images": ImageSerializer(obj.get_all_media()["images"], many=True).data,
            "videos": VideoSerializer(obj.get_all_media()["videos"], many=True).data,
        }

    def get_all_ministries(self, obj):
        return MinistrySerializer(obj.get_all_ministries(), many=True).data

    def get_all_events(self, obj):
        return EventSerializer(obj.get_all_events(obj), many=True).data

    def get_all_church_officials(self, obj):
        return ChurchOfficialSerializer(obj.get_all_church_officials(), many=True).data

    def get_all_sermons(self, obj):
        return SermonSerializer(obj.get_all_sermons(), many=True).data

    def get_all_prayer_requests(self, obj):
        return PrayerRequestSerializer(obj.get_all_prayer_requests(), many=True).data


class EmailSerializer(serializers.Serializer):
    message = serializers.CharField()
