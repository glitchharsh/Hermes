import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import EmailList
from .serializers import EmailListSerializer
from .mailer import Email

class EmailListView(APIView):
    serializer_class = EmailListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = []

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if not serializer.is_valid():
            return Response({'error':'invalid data'}, status=HTTP_200_OK)
        user = request.user
        if not user:
            return Response({'error':'user not found'}, status=HTTP_200_OK)
        emails = serializer.validated_data['reciever_emails']
        if len(emails) <= 0:
            return Response({'error':'no target emails sent'}, status=HTTP_200_OK)
        reciever = list(json.loads(emails)['mails'])
        sender = serializer.validated_data['sender_email']
        password = serializer.validated_data['app_password']
        msg = serializer.validated_data['email_body']
        resp = Email(sender,reciever,password,msg).send_many()
        if not resp:
            return Response({'error':'internal error'}, status=HTTP_200_OK)
        return Response({'data':'emails successfully sent'}, status=HTTP_200_OK)


        


