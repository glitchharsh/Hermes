from django.db import models
from users.models import User
# Create your models here.
class EmailRecommends(models.Model):
    generated_for = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.CharField(max_length=5000)

class SMSRecommends(models.Model):
    generated_for = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.CharField(max_length=200)