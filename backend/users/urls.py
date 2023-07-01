from django.urls import path
from .views import RegisterUserView, MyObtainTokenPairView, SendEmailView, VerifyEmailView, SendEmailPasswordView, VerifyEmailPasswordView, SetNewPasswordView, RetrieveUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('auth/register/', RegisterUserView.as_view(), name='register'),
    path('auth/login/', MyObtainTokenPairView.as_view(), name='obtain_token'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('auth/retrieve/', RetrieveUserView.as_view(), name='retrieve_user'),
    path('email/send/', SendEmailView.as_view(), name='send_email'),
    path('email/verify/', VerifyEmailView.as_view(), name='verify_email'),
    path('forgot-password/email/send/',SendEmailPasswordView.as_view(), name='send_email_password'),
    path('forgot-password/email/verify/',VerifyEmailPasswordView.as_view(), name='verify_email_password'),
    path('forgot-password/set-password/',SetNewPasswordView.as_view(), name='set_password'),
    ]