from rest_framework import serializers

class SMSListSerializer(serializers.Serializer):
    reciever_numbers = serializers.ListField(child = serializers.CharField(max_length=20))
    message = serializers.CharField(max_length=300, allow_blank=False)