import os
import django
from django.contrib.auth import get_user_model

# Replace these values with the desired superuser details
SUPERUSER_USERNAME = "test41@gmail1.com"
SUPERUSER_EMAIL = "test41@gmail1.com"
SUPERUSER_PASSWORD = "password3"

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

# Create the superuser
User = get_user_model()
if not User.objects.filter(username=SUPERUSER_USERNAME).exists():
    superuser = User.objects.create_superuser(SUPERUSER_USERNAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD)
    print("Superuser created successfully.")
else:
    superuser = User.objects.get(username=SUPERUSER_USERNAME)
    print("Superuser already exists.")

# Print superuser details
if superuser:
    print("Superuser details:")
    print(f"Username: {superuser.username}")
    print(f"Email: {superuser.email}")
    # You can print other user details here
