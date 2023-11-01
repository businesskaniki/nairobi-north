"""
This module contains Django models for our application.

This module defines various Django models used in our application to represent
database tables. It includes models for users, posts, comments, and other data
structures.

"""
import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator, FileExtensionValidator


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
    regex=r"^\+?1?\d{9,15}$",
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
)


class UserProfile(AbstractBaseUser):
    """
    Fields for the user profile
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=200, verbose_name="email")
    username = models.CharField(max_length=255, unique=True)
    profile_picture = models.ImageField(
        upload_to="profile_pics/", default="default_profile.png"
    )
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
    REQUIRED_FIELDS = ["username"]

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

    def __str__(self):
        """
        Define how the user instance is represented as a string
        """
        return f"{self.username}"

    def tokens(self):
        """
        creating the token
        """
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


class Church(models.Model):
    """
    church model and methods
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    about = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    founding_year = models.PositiveIntegerField()
    description_1 = models.TextField()
    description_2 = models.TextField()
    description_3 = models.TextField()
    background_image_1 = models.ImageField(
        upload_to="church_backgrounds/",
        blank=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    background_image_2 = models.ImageField(
        upload_to="church_backgrounds/",
        blank=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    background_image_3 = models.ImageField(
        upload_to="church_backgrounds/",
        blank=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    mission = models.TextField(
        help_text="Enter the mission statement of the organization"
    )
    vision = models.TextField(
        help_text="Enter the vision statement of the organization"
    )
    slogan = models.CharField(
        max_length=100,
        help_text="Enter the organization's slogan (e.g., a short tagline)",
    )

    def __str__(self):
        return f"{self.name}"

    def get_all_media(self):
        """
        Retrieve all images and videos associated with the church.
        """
        images = Image.objects.filter(church=self)
        videos = Video.objects.filter(church=self)
        return {"images": images, "videos": videos}

    def get_all_ministries(self):
        """
        Retrieve all events associated with the church.
        """
        return Ministry.objects.filter(church=self)

    def get_all_events(self,church):
        """
        get all events
        
        """
        return Event.objects.filter(church=church)
    def get_all_church_officials(self):
        """
        Retrieve all church officials associated with the church.
        """
        return ChurchOfficial.objects.filter(church=self)

    def get_all_sermons(self):
        """
        Retrieve all sermons associated with the church.
        """
        return Sermon.objects.filter(church=self)

class EventManager(models.Manager):
    """events manager"""

    def events_for_church(self, church):
        """
        Retrieve all events associated with the given church.
        """
        return self.filter(church=church)


class Event(models.Model):
    """
    Model representing an event associated with a church.
    Methods:
        __str__(): Returns the string representation of the event (event name).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, help_text="Enter the event name")
    poster = models.ImageField(upload_to="events/", blank=True)
    date = models.DateField(help_text="Select the event date")
    description = models.TextField(help_text="Enter a detailed event description")
    location = models.CharField(max_length=100, help_text="Enter the event location")
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="events",
        help_text="Select the associated church",
    )
    objects = EventManager()

    def __str__(self):
        """
        Returns the string representation of the event (event name).
        """
        return f"{self.name}"


class MinistryManager(models.Manager):
    """ministry manager"""
    def ministries_for_church(self, church):
        """
        Retrieve all ministries associated with the given church.
        """
        return self.filter(church=church)


class Ministry(models.Model):
    """
    Model representing a ministry associated with a church.
    Methods:
        __str__(): Returns the string representation of the ministry (ministry name).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, help_text="Enter the ministry name")
    background_image = models.ImageField(upload_to="ministries/", blank=True)
    background_text = models.TextField(
        help_text="Enter a detailed ministry description"
    )
    description = models.TextField(help_text="Enter a detailed ministry description")
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="ministries",
        help_text="Select the associated church",
    )

    def get_all_media(self):
        """
        Retrieve all images and videos associated with the ministry.
        """
        images = Image.objects.filter(ministries=self)
        videos = Video.objects.filter(ministries=self)
        return {"images": images, "videos": videos}

    objects = MinistryManager()

    def __str__(self):
        """
        Returns the string representation of the ministry (ministry name).
        """
        return f"{self.name}"


class ImageManager(models.Manager):
    """
    Custom manager for the Image model.

    This manager provides methods for retrieving and managing images associated with a church.
    """

    def get_queryset(self):
        """
        get_queryset(self): Returns a queryset of images associated with the church.
        """
        return super().get_queryset().filter(church=self)


class Image(models.Model):
    """
    Model representing an image in a church gallery.

    Methods:
        __str__(): Returns the string representation of the image (image description).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image = models.ImageField(
        upload_to="church_gallery_images/",
        help_text="Select or upload an image file",
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    description = models.TextField(help_text="Enter a detailed image description")
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="images",
        help_text="Select the associated church",
    )
    ministries = models.ManyToManyField(
        Ministry, related_name="ministry_imgs", blank=True
    )

    objects = ImageManager()

    def __str__(self):
        """
        Returns the string representation of the image (image description).
        """
        return f"{self.description}"


class VideoManager(models.Manager):
    """
    Custom manager for the Video model.

    This manager provides methods for retrieving and managing videos associated with a church.
    """

    def get_queryset(self):
        """
        get_queryset(self): Returns a queryset of videos associated with the church.
        """
        return super().get_queryset().filter(church=self)


class Video(models.Model):
    """
    Model representing a video in a church gallery.
    Methods:
        __str__(): Returns the string representation of the video (video title).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.FileField(
        upload_to="church_gallery_videos/",
        help_text="Select or upload a video file",
        validators=[FileExtensionValidator(allowed_extensions=["mp4", "avi", "mov"])],
    )
    title = models.CharField(max_length=100, help_text="Enter the video title")
    description = models.TextField(help_text="Enter a detailed video description")
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="videos",
        help_text="Select the associated church",
    )
    ministries = models.ManyToManyField(
        Ministry, related_name="ministry_vids", blank=True
    )
    objects = VideoManager()

    def __str__(self):
        """
        Returns the string representation of the video (video title).
        """
        return f"{self.title}"


class PrayerRequest(models.Model):
    """
    Model representing a prayer request.
    Methods:
        __str__(): Returns the string representation of the prayer request (title).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(
        max_length=100, help_text="Enter the title of the prayer request"
    )
    description = models.TextField(
        help_text="Enter a detailed description of the request"
    )
    requester_name = models.CharField(max_length=100, help_text="Enter your name")
    date_created = models.DateField(
        auto_now_add=True, help_text="Date the request was created"
    )
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="prayer_requests",
        help_text="Select the associated church",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=10, blank=True)

    def __str__(self):
        """
        Returns the string representation of the prayer request (title).
        """
        return f"{self.title}"

class ChurchOfficialManager(models.Manager):
    """officials manager"""
    def get_queryset(self):
        """method for getting church managers for a spesific church"""
        return super().get_queryset().filter(church=self)


class SermonManager(models.Manager):
    """manager for sermons"""
    def get_queryset(self):
        """method for getting sermons for a spesific church"""
        return super().get_queryset().filter(church=self)

class ChurchOfficial(models.Model):
    """
    Model representing church officials.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, help_text="Enter the name of the official")
    position = models.CharField(
        max_length=50,
        help_text="Select the position of the official",
    )
    email = models.EmailField(
        max_length=100, blank=True, help_text="Enter the official's email (optional)"
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=10, blank=True)

    address = models.TextField(
        blank=True, help_text="Enter the official's address (optional)"
    )
    image = models.ImageField(
        upload_to="official_images/",
        blank=True,
        help_text="Upload an image of the official (optional)",
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    objects = ChurchOfficialManager()

    def __str__(self):
        return f"{self.name}"


class Sermon(models.Model):
    """
    Model representing sermons.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, help_text="Enter the title of the sermon")
    preacher = models.CharField(max_length=100, help_text="Enter the preacher's name")
    date = models.DateField(help_text="Select the date of the sermon")
    scripture_references = models.TextField(
        help_text="Enter scripture references (e.g., John 3:16-18)"
    )
    description = models.TextField(
        blank=True, help_text="Enter a detailed description of the sermon (optional)"
    )
    audio_file = models.FileField(
        upload_to="sermon_audio/",
        blank=True,
        help_text="Upload an audio file of the sermon (optional)",
        validators=[FileExtensionValidator(allowed_extensions=["mp3", "wav", "ogg"])],
    )
    image = models.ImageField(
        upload_to="sermon_images/",
        blank=True,
        help_text="Upload an image related to the sermon (optional)",
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "gif"])
        ],
    )
    video = models.FileField(
        upload_to="sermon_videos/",
        blank=True,
        help_text="Upload a video related to the sermon (optional)",
        validators=[FileExtensionValidator(allowed_extensions=["mp4", "avi", "mov"])],
    )
    church = models.ForeignKey(
        Church,
        on_delete=models.CASCADE,
        related_name="sermons",
        help_text="Select the associated church",
    )
    objects = SermonManager()

    def __str__(self):
        return f"{self.title}"
