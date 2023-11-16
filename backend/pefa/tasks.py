# tasks.py

from celery import shared_task
from django.core.mail import send_mail
from django.contrib.auth.models import User
from datetime import datetime, timedelta

@shared_task
def send_monthly_email_task():
    # Find users who should receive the monthly email
    end_of_month = datetime.now().replace(day=1, month=datetime.now().month+1) - timedelta(days=1)
    users_to_email = User.objects.filter(profile__send_monthly_email=True)

    for user in users_to_email:
        subject = 'Monthly Greetings'
        message = f'Dear {user.username},\nThank you for being a part of our community. Here is your monthly update!'
        from_email = 'your@example.com'  # Update with your email address
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)
