"""
API views for user registration, login, user profile management, and authentication.

This module contains Django views and URL configurations for handling user registration,
authentication, user profile management, and CRUD operations for Tag, Photo, and Video objects.
"""

from django.urls import path,re_path
from .views import (
    RegisterView,
    LoginView,
    UserProfileListView,
    UserProfileDetail
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("user-profiles/", UserProfileListView.as_view(), name="user-profiles"),
    re_path(r'^user-profile/(?P<pk>[0-9a-f-]+)/$', UserProfileDetail.as_view(), name="user-profile-detail")
]
