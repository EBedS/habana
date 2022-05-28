"""The Improved User Model
Mixin classes used to create this class may be found in mixins.py
The UserManager is found in managers.py
"""
from django.db import models

from .model_mixins import AbstractUser


class UserModel(AbstractUser):
    """
    The Improved User Model is intended to be used out-of-the-box.
    Do **not** import this model directly: use
    :py:func:`~django.contrib.auth.get_user_model`.
    """
    phone_country_code = models.CharField(max_length=8, blank=True, null=True)
    phone_no = models.CharField(max_length=100, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)

    zoom_invitation_sent = models.BooleanField(default=False)
    added_to_google_contacts = models.BooleanField(default=False)
