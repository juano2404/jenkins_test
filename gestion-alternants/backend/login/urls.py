# login/urls.py
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CheckAuthenticationAPIView,PasswordResetAPIView,PasswordResetViewSubmission

from .views import LogoutView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),  
    path('check-auth/', CheckAuthenticationAPIView.as_view(), name='check-auth'),
    path('password-reset/', PasswordResetAPIView.as_view(), name='password-reset'),
    path('reset-password-submission/', PasswordResetViewSubmission.as_view(), name='password-reset-submission'),
   
]
