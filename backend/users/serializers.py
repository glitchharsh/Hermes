from users.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['name'] = user.name
        return token


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('name', 'phone_number', 'email', 'password', 'age', 'gender')

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)

class SendEmailSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        if not self.initial_data.get("email"):
            raise serializers.ValidationError("email must be provided")
        return value


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True, required=True)
    otp = serializers.CharField(write_only=True, required=True)


class SetNewPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if not self.initial_data.get("phone_number") and not self.initial_data.get("email"):
            raise serializers.ValidationError(
                "Either email or phone_number must be provided")
        return value

    def validate_phone_number(self, value):
        if not self.initial_data.get("email") and not self.initial_data.get("phone_number"):
            raise serializers.ValidationError(
                "Either email or phone_number must be provided")
        return value