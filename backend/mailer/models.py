from django.db import models
from users.models import User

class EmailList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    user_list = models.JSONField(null=False)


