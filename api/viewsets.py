from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from habanaforms.models import HabanaForm, HabanaFormField, HabanaFormResponse
from api.serializers import HabanaFormSerializer, HabanaFormFieldSerializer,\
    HabanaFormResponseSerializer


class HabanaFormViewset(viewsets.ViewSet):

    def list(self, request):
        queryset = HabanaForm.objects.all()
        serializer = HabanaFormSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = HabanaFormSerializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'HabanaForm created.'})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):
        queryset =  HabanaFormField.objects.filter(stage=pk)
        serializer = HabanaFormSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        habana_form = HabanaForm.objects.filter(id=pk).first()
        habana_form.delete()
        return Response({'message':'HabanaForm Deleted.'})


class HabanaFormResponseViewset(viewsets.ViewSet):
    permission_classes = (IsAuthenticated, )

    def list(self, request):
        pass

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass



