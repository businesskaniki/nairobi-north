"""
API views for user registration, login, user profile management, and authentication.

This module contains Django views and URL configurations for handling user registration,
authentication, user profile management, and CRUD operations for Tag, Photo, and Video objects.
"""

from django.urls import path,re_path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    RegisterView,
    LoginView,
    UserProfileListView,
    UserProfileDetail,
    SetNewPasswordAPIView,
    VerifyEmail,
    RequestPasswordResetEmail,
    PasswordTokenCheckAPI,
    LogoutAPIView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path("user-profiles/", UserProfileListView.as_view(), name="user-profiles"),
    re_path(r'^user-profile/(?P<pk>[0-9a-f-]+)/$', UserProfileDetail.as_view(), name="user-profile-detail"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]
