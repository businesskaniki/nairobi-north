"""
This module contains Django models for our application.

This module defines various Django models used in our application to represent
database tables. It includes models for users, posts, comments, and other data
structures.

"""
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken


# Custom manager for the UserProfile model
class AccountManager(BaseUserManager):
    """
    creating a user extending from baseUserMode which is django inbuild
    """

    def create_user(self, email, username, password=None):
        """
        # Check if email is provided
        """
        if not email:
            raise ValueError("Please provide an email.")
        # Check if username is provided
        if not username:
            raise ValueError("Please provide a username.")

        # Create a new user instance with normalized email and username
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        # Set the user's password
        user.set_password(password)
        # Save the user to the database
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        """
        Create a superuser by calling create_user with additional settings
        """
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        # Set the user as staff and superuser
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        # Save the user with updated settings
        user.save(using=self._db)
        return user


# Custom user model based on AbstractBaseUser
class UserProfile(AbstractBaseUser):
    """
    Fields for the user profile
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=200, verbose_name="email")
    username = models.CharField(max_length=255, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', default='default_profile.png')
    first_name = models.CharField(max_length=200, null=True)
    is_verified = models.BooleanField(default=False)
    last_name = models.CharField(max_length=200, null=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # Indicates if the account is active
    is_staff = models.BooleanField(default=False)  # Indicates staff status
    is_superuser = models.BooleanField(default=False)  # Indicates superuser status

    USERNAME_FIELD = "email"  # Use email as the unique identifier for login
    REQUIRED_FIELDS = [
        "username"
    ]  # Fields required for user creation (in addition to email)

    objects = AccountManager()  # Custom manager for the UserProfile model

    # Check if the user has a specific permission
    def has_perm(self):
        """
        Only superusers have all permissions
        """
        return self.is_admin

    # Check if the user has permissions to access a specific app/module
    def has_module_perms(self):
        """
        Only superusers have all app-level permissions
        """
        return self.is_superuser

    # Define how the user instance is represented as a string
    def __str__(self):
        return f"{self.username}"
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }