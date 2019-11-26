from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    key = models.CharField(max_length=100)
    labels = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    username = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True, blank=True)
    # owner = models.ForeignKey(User, related_name='images', on_delete=models.CASCADE, null=True)
    