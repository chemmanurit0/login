from django.db import models

# Create your models here.
class UserData(models.Model):
    name = models.CharField(max_length=30)
    address = models.TextField()