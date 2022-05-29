from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import UserModelSerializer
from habanaforms.models import HabanaForm, HabanaFormField, HabanaFormResponse


@api_view(['GET'])
def create_random_evaluation(request, pk=None):
    if request.method == 'GET':
        questions = HabanaFormField.objects.all()
        print(questions)
        return Response({'message':'Hola'})


@api_view(['GET'])
def get_current_user(request, pk=None):
    pass



