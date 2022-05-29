import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import UserModelSerializer
from habanaforms.models import HabanaForm, HabanaFormField, HabanaFormResponse
from api.serializers import HabanaFormFieldSerializer


@api_view(['GET'])
def create_random_evaluation(request, pk=None):
    if request.method == 'GET':
        questions = HabanaFormField.objects.all()
        random_question = questions[random.randint(0,len(questions)-1)]
        print(random_question.id)
        responses = HabanaFormResponse.objects.all().filter(habana_form_field=random_question.id)
        print(responses)
        return Response({
            'random_question':random_question,
            'random_responses': HabanaFormFieldSerializer(responses),
            })


@api_view(['GET'])
def get_current_user(request, pk=None):
    current_user = request.user
    return Response({
        'id': current_user.id,
        'first_name': current_user.first_name,
        'last_name': current_user.last_name,
        'email': current_user.email,
    })


