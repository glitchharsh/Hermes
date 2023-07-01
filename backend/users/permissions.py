from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated

from main.settings import API_KEY

import os


class APITokenPermission(BasePermission):
    def has_permission(self, request, view):
        token = request.headers.get("Authorization")
        if not token:
            return False
        token = token.split(" ")[1] 
        if token == API_KEY:
            return True
        return False


class AllowOptionsAuthentication(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'OPTIONS':
            return True
        return request.user and request.user.is_authenticated