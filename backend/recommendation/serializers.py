from rest_framework import serializers
from .models import EmailRecommends, SMSRecommends

class EmailRecommendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailRecommends
        fields = ('data')

class SMSRecommendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SMSRecommends
        fields = ('data')

class RecommendsSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=2000, required=True)
    