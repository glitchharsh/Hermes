from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

from .managers import UserManager

import datetime

GENDER_CHOICES = (
    ("MALE", "MALE"),
    ("FEMALE", "FEMALE"),
    ("OTHERS", "OTHERS"),
)

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=40, blank=True)
    email = models.EmailField(unique=True, max_length=40)
    phone_number = models.CharField(unique=True, max_length=15)
    age = models.CharField(max_length=5)
    gender = models.CharField(max_length=15, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['email']

    objects = UserManager()

    def __str__(self):
        return self.email


class Verification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email_verified = models.BooleanField(default=False)
    email_otp = models.CharField(max_length=8)


class ForgotPassword(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email_otp = models.CharField(max_length=8)
    email_verified = models.BooleanField(default=False)
    last_changed = models.DateTimeField(default=datetime.datetime(
        year=1970, month=1, day=1, hour=0, minute=0, second=0))