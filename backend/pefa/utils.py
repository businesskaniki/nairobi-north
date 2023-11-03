"""
Module: email_util
This module provides utility classes and functions for
 sending emails in a separate thread using Django's 
 EmailMessage and threading.
"""

import threading
from django.core.mail import EmailMessage


class EmailThread(threading.Thread):
    """
    A custom threading class to send an email in a separate thread.
    """

    def __init__(self, email):
        """
        Initialize the EmailThread.

        :param email: An instance of EmailMessage to send.
        """
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        """
        Start the thread and send the email.
        """
        self.email.send()


class Util:
    """utill class"""

    @staticmethod
    def send_email(data):
        """
        Send an email with the provided data.

        :param data: A dictionary containing email_subject, email_body, and to_email.
        """
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )
        EmailThread(email).start()
