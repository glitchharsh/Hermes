import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import SMSListSerializer
from .messager import Messager

class SMSListView(APIView):
    serializer_class = SMSListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if not serializer.is_valid():
            return Response({'error':'invalid data'}, status=HTTP_200_OK)
        user = request.user
        if not user:
            return Response({'error':'user not found'}, status=HTTP_200_OK)
        nums = serializer.validated_data['reciever_numbers']
        if len(nums) <= 0:
            return Response({'error':'no target emails sent'}, status=HTTP_200_OK)
        reciever = list(nums)
        msg = serializer.validated_data['message']
        resp = Messager(reciever,msg).send_many()
        if not resp:
            return Response({'error':'internal error'}, status=HTTP_200_OK)
        return Response({'data':'messages successfully sent'}, status=HTTP_200_OK)