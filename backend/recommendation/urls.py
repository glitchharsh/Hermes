from django.urls import path
from .views import SMSRecommendationView, EmailRecommendationView, RetrieveUserRecommends

urlpatterns = [
    path('', RetrieveUserRecommends.as_view()),
    path('sms/', SMSRecommendationView.as_view()),
    path('email/', EmailRecommendationView.as_view())
]
