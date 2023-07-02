from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import EmailRecommendsSerializer, SMSRecommendsSerializer, RecommendsSerializer
from .models import SMSRecommends, EmailRecommends
from .api_client import OpenaiClient

class RetrieveUserRecommends(APIView):
    authentication_classes = [JWTAuthentication]
    permissions_classes = []

    def post(self, request):
        user = request.user
        if not user:
            return Response({'error':'User not found'}, status=HTTP_200_OK)
        sms_data = SMSRecommends.objects.filter(generated_for=user).values_list('data')
        email_data = EmailRecommends.objects.filter(generated_for=user).values_list('data')
        data = {'saved_sms':sms_data, 'saved_email':email_data}
        return Response(data, status=HTTP_200_OK)

class EmailRecommendationView(APIView):
    serializer_class = RecommendsSerializer
    authentication_classes = [JWTAuthentication]
    permissions_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user:
                return Response({'error':'User not found'}, status=HTTP_200_OK)
            prompt = serializer.validated_data['prompt']
            api_response = OpenaiClient.run_prompt(serializer.validated_data['prompt'])
            EmailRecommends.objects.create(generated_for=user, data=api_response)
            return Response({'data':api_response}, status=HTTP_200_OK)
        return Response({'error':'invalid data'}, status=HTTP_200_OK)        

class SMSRecommendationView(APIView):
    serializer_class = RecommendsSerializer
    authentication_classes = [JWTAuthentication]
    permissions_classes = []

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user:
                return Response({'error':'User not found'}, status=HTTP_200_OK)
            api_response = OpenaiClient.run_prompt(serializer.validated_data['prompt'])
            SMSRecommends.objects.create(generated_for=user, data=api_response)
            return Response({'data':api_response}, status=HTTP_200_OK)
        return Response({'error':'invalid data'}, status=HTTP_200_OK)  
            
            
        
