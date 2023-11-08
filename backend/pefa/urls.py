"""
API views for user registration, login, user profile management, and authentication.

This module contains Django views and URL configurations for handling user registration,
authentication, user profile management, and CRUD operations for Tag, Photo, and Video objects.
"""

from django.urls import path, re_path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

# pylint: disable=E0402
from .views import (
    RegisterView,
    LoginView,
    UserProfileListView,
    UserProfileDetail,
    SetNewPasswordAPIView,
    VerifyEmail,
    RequestPasswordResetEmail,
    PasswordTokenCheckAPI,
    LogoutAPIView,
    ChurchListCreateView,
    ChurchRetrieveUpdateDeleteView,
    EventListCreateView,
    EventRetrieveUpdateDeleteView,
    MinistryListCreateView,
    MinistryRetrieveUpdateDeleteView,
    ImageListCreateView,
    ImageRetrieveUpdateDeleteView,
    VideoListCreateView,
    VideoRetrieveUpdateDeleteView,
    PrayerRequestListCreateView,
    PrayerRequestRetrieveUpdateDeleteView,
    ChurchOfficialListCreateView,
    ChurchOfficialRetrieveUpdateDeleteView,
    SermonListCreateView,
    SermonRetrieveUpdateDeleteView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("user-profiles/", UserProfileListView.as_view(), name="user-profiles"),
    re_path(
        r"^user-profile/(?P<pk>[0-9a-f-]+)/$",
        UserProfileDetail.as_view(),
        name="user-profile-detail",
    ),
    path("email-verify/", VerifyEmail.as_view(), name="email-verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "request-reset-email/",
        RequestPasswordResetEmail.as_view(),
        name="request-reset-email",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordTokenCheckAPI.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset-complete",
        SetNewPasswordAPIView.as_view(),
        name="password-reset-complete",
    ),
    re_path(r"^church/$", ChurchListCreateView.as_view(), name="church-list-create"),
    re_path(
        r"^church/(?P<pk>[0-9a-f-]+)/$",
        ChurchRetrieveUpdateDeleteView.as_view(),
        name="church-retrieve-update-delete",
    ),
    re_path(r"^event/$", EventListCreateView.as_view(), name="event-list-create"),
    re_path(
        r"^event/(?P<pk>[0-9a-f-]+)/$",
        EventRetrieveUpdateDeleteView.as_view(),
        name="event-retrieve-update-delete",
    ),
    re_path(
        r"^ministry/$", MinistryListCreateView.as_view(), name="ministry-list-create"
    ),
    re_path(
        r"^ministry/(?P<pk>[0-9a-f-]+)/$",
        MinistryRetrieveUpdateDeleteView.as_view(),
        name="ministry-retrieve-update-delete",
    ),
    re_path(r"^image/$", ImageListCreateView.as_view(), name="image-list-create"),
    re_path(
        r"^image/(?P<pk>[0-9a-f-]+)/$",
        ImageRetrieveUpdateDeleteView.as_view(),
        name="image-retrieve-update-delete",
    ),
    re_path(r"^video/$", VideoListCreateView.as_view(), name="video-list-create"),
    re_path(
        r"^video/(?P<pk>[0-9a-f-]+)/$",
        VideoRetrieveUpdateDeleteView.as_view(),
        name="video-retrieve-update-delete",
    ),
    re_path(
        r"^prayer-request/$",
        PrayerRequestListCreateView.as_view(),
        name="prayer-request-list-create",
    ),
    re_path(
        r"^prayer-request/(?P<pk>[0-9a-f-]+)/$",
        PrayerRequestRetrieveUpdateDeleteView.as_view(),
        name="prayer-request-retrieve-update-delete",
    ),
    re_path(
        r"^church-official/$",
        ChurchOfficialListCreateView.as_view(),
        name="church-official-list-create",
    ),
    re_path(
        r"^church-official/(?P<pk>[0-9a-f-]+)/$",
        ChurchOfficialRetrieveUpdateDeleteView.as_view(),
        name="church-official-retrieve-update-delete",
    ),
    re_path(r"^sermon/$", SermonListCreateView.as_view(), name="sermon-list-create"),
    re_path(
        r"^sermon/(?P<pk>[0-9a-f-]+)/$",
        SermonRetrieveUpdateDeleteView.as_view(),
        name="sermon-retrieve-update-delete",
    ),
]
