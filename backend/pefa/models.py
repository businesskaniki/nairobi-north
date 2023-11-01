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
from django.core.validators import RegexValidator


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

class Department(models.Model):
    """
    Represents a department within the organization.

    This model stores information about different departments or units
    within the organization. Each department can have a unique name
    and other related attributes.

    Fields:
    - name (str): The name of the department.
    - Add other fields related to the department as needed.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)

# Custom user model based on AbstractBaseUser
phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
class UserProfile(AbstractBaseUser):
    """
    Fields for the user profile
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=200, verbose_name="email")
    username = models.CharField(max_length=255, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', default='default_profile.png')
    first_name = models.CharField(max_length=200, null=True)
    last_name = models.CharField(max_length=200, null=True)
    departments = models.ManyToManyField(Department)
    residence = models.CharField(max_length=100)
    phone_number = models.CharField(validators=[phone_regex], max_length=10, blank=True)
    gender = models.CharField(max_length=4)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username"
    ]

    objects = AccountManager()

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
    #creating the tokens
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }