import random
import datetime
from zoneinfo import ZoneInfo
from django.shortcuts import render
from django.templatetags.static import static
from django.forms.models import model_to_dict
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_500_INTERNAL_SERVER_ERROR
from .serializers import MyTokenObtainPairSerializer, UserSerializer, SendEmailSerializer, VerifyEmailSerializer, SetNewPasswordSerializer, ForgotPasswordSerializer
from .permissions import APITokenPermission
from mailer import Email
from .models import User, Verification, ForgotPassword



class MyObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    authentication_classes = []
    permission_classes = []


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

class RetrieveUserView(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request):
        user_data_full = model_to_dict(request.user)
        user_data = {
            "name": user_data_full["name"],
            "email": user_data_full["email"],
            "phone_number": user_data_full["phone_number"],
            "age": user_data_full["age"],
            "gender": user_data_full["gender"],
            "date_joined": user_data_full["date_joined"],
        }
        return Response(user_data, status=HTTP_200_OK)



class SendEmailView(APIView):
    serializer_class = SendEmailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = User.objects.filter(email=email)
            if user.count() == 0:
                return Response({"data": "User not found"}, status=HTTP_200_OK)
            user = user[0]
            obj = Verification.objects.filter(user=user.id)
            if obj.count() == 0:
                obj = Verification.objects.create(user=user)
            else:
                obj = obj[0]
            if obj.email_verified == True:
                return Response({"data": "User already verified"}, status=HTTP_200_OK)
            otp = random.randrange(100000, 999999)
            sent = Email(email, user.name).send_otp(otp)
            if not sent:
                return Response({"data": "An unexpected error occured, please notify the devs"}, status=HTTP_200_OK)
            obj.email_otp = otp
            obj.save()
            return Response({"data": "OTP sent please check your mail"}, status=HTTP_200_OK)


class VerifyEmailView(APIView):

    serializer_class = VerifyEmailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            otp = serializer.validated_data["otp"]
            user = User.objects.filter(email=email)
            if user.count() == 0:
                return Response({"data": "User not found"}, status=HTTP_200_OK)
            user = user[0]
            obj = Verification.objects.filter(user=user.id)
            if obj.count() == 0:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            else:
                obj = obj[0]
            if obj.email_verified == True:
                return Response({"data": "Email already verified"}, status=HTTP_200_OK)
            if obj.email_otp is None:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            if obj.email_otp != otp:
                return Response({"data": "Incorrect OTP"}, status=HTTP_200_OK)
            if obj.email_otp == otp:
                obj.email_verified = True
                obj.save()
                return Response({"data": "Email verified"}, status=HTTP_200_OK)
            return Response({"data": "An unexpected error occured, please notify the devs"}, status=HTTP_500_INTERNAL_SERVER_ERROR)

class SendEmailPasswordView(APIView):
    serializer_class = SendEmailSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = User.objects.filter(email=email)
            if user.count() == 0:
                return Response({"data": "User not found"}, status=HTTP_200_OK)
            user = user[0]
            obj = ForgotPassword.objects.filter(user=user.id)
            if obj.count() == 0:
                obj = ForgotPassword.objects.create(user=user)
            else:
                obj = obj[0]
            otp = random.randrange(100000, 999999)
            sent = Email(email, user.name).send_otp(otp)
            if not sent:
                return Response({"data": "An unexpected error occured"}, status=HTTP_200_OK)
            obj.email_otp = otp
            obj.save()
            return Response({"data": "OTP sent please check your mail"}, status=HTTP_200_OK)
        return Response({"data": "An unexpected error occured"}, status=HTTP_200_OK)


class VerifyEmailPasswordView(APIView):
    serializer_class = VerifyEmailSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            otp = serializer.validated_data["otp"]
            user = User.objects.filter(email=email)
            if user.count() == 0:
                return Response({"data": "User not found"}, status=HTTP_200_OK)
            user = user[0]
            obj = ForgotPassword.objects.filter(user=user.id)
            if obj.count() == 0:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            else:
                obj = obj[0]
            if obj.email_otp is None:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            if obj.email_otp != otp:
                return Response({"data": "Incorrect OTP"}, status=HTTP_200_OK)
            if obj.email_otp == otp:
                obj.email_verified = True
                obj.save()
                return Response({"data": "User verified"}, status=HTTP_200_OK)
            return Response({"data": "An unexpected error occured, please notify the devs"}, status=HTTP_200_OK)

class SetNewPasswordView(APIView):
    serializer_class = SetNewPasswordSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = User.objects.filter(email=email)
            if user.count() == 0:
                return Response({"data": "User not found"}, status=HTTP_200_OK)
            user = user[0]
            obj = ForgotPassword.objects.filter(user=user.id)
            if obj.count() == 0:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            else:
                obj = obj[0]
            if obj.email_otp is None and obj.phone_otp is None:
                return Response({"data": "Improper configuration"}, status=HTTP_200_OK)
            if obj.email_verified != True and obj.phone_verified != True:
                return Response({"data": "User must be verified before changing the password"}, status=HTTP_200_OK)
            delta = datetime.datetime.now(
                datetime.timezone.utc) - obj.last_changed
            if delta.seconds < 3600:
                return Response({"data": "Password changed recently"}, status=HTTP_200_OK)
            user.set_password(password)
            obj.last_changed = datetime.datetime.now(
                tz=ZoneInfo('Asia/Kolkata'))
            obj.save()
            user.save()
            return Response({"data": "Password changed succesfully"}, status=HTTP_200_OK)
