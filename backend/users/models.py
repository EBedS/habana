"""The Improved User Model
Mixin classes used to create this class may be found in mixins.py
The UserManager is found in managers.py
"""
from django.db import models

from .model_mixins import AbstractUser


class UserModel(AbstractUser):
    phone_no = models.CharField(max_length=100, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)
    hard_score = models.IntegerField(blank=True, null=True)
    soft_score = models.IntegerField(blank=True, null=True)





