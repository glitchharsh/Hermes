from rest_framework import serializers
from .models import EmailList

class EmailListSerializer(serializers.Serializer):
    reciever_emails = serializers.ListField(child = serializers.CharField(max_length=100))
    app_password = serializers.CharField(max_length = 50, allow_blank = False)
    sender_email = serializers.EmailField(max_length=50, allow_blank=False)
    email_body = serializers.CharField(max_length=5000, allow_blank=False)