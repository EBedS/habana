from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

	def natural_key(self):
		return self.username



