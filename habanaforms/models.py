from django.db import models
from django.conf import settings
from markdownx.models import MarkdownxField
from users.models import UserModel

# Create your models here
class HabanaFormFieldChoices(models.IntegerChoices):
    TEXT = 1,"Texto"
    LONG_TEXT = 2, "Texto Largo"
    SINGLE_CHOICE = 3,"Selección única"
    MULTIPLE_CHOICE = 4, "Selección multiple"


class HabanaForm(models.Model):
    title = models.CharField(max_length=140)
    description = MarkdownxField()
    sort_order = models.IntegerField(default=0)
    available_from = models.DateTimeField(null=True, default=None)
    available_until = models.DateTimeField(null=True, default=None)

    def __str__(self):
        return self.title


class HabanaFormField(models.Model):
    title = models.CharField(max_length=140)
    description = models.CharField(max_length=240)
    field_type = models.IntegerField(choices=HabanaFormFieldChoices.choices)
    stage = models.ForeignKey(HabanaForm, on_delete=models.CASCADE)
    sort_order = models.IntegerField(default=0)


class HabanaFormResponse(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    habana_form_response = models.ForeignKey(HabanaFormField, on_delete=models.CASCADE)

    class Meta:
        constraints = [models.UniqueConstraint(fields=['owner', 'habana_form_response'], name=' unique_response'),]


#class Evaluation(models.Model):
#    evaluator = models.ForeignKey(UserModel, on_delete=models.CASCADE)
#    selection = models.ForeignKey(UserModel, on_delete=models.CASCADE)

