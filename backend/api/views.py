from rest_framework.decorators import api_view
from habanaforms.models import HabanaForm, HabanaFormField, HabanaFormResponse


@api_view(['GET'])
def create_random_evaluation(request, pk=None):
    if request.method == 'GET':
        questions = HabanaFormField.objects.all().filter(stage=pk)

