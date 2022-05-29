from rest_framework.serializers import ModelSerializer

from habanaforms.models import HabanaForm, HabanaFormField, \
    HabanaFormResponse
from users.models import UserModel


class HabanaFormSerializer(ModelSerializer):
    class Meta:
        model = HabanaForm
        fields = '__all__'


class HabanaFormFieldSerializer(ModelSerializer):
    class Meta:
        model = HabanaFormField
        fields = '__all__'


class HabanaFormResponseSerializer(ModelSerializer):
    class Meta:
        model = HabanaFormResponse
        fields = '__all__'


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'





