from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from habanaforms.models import HabanaForm, HabanaFormField, HabanaFormResponse
from users.models import UserModel
from api.serializers import HabanaFormSerializer, HabanaFormFieldSerializer,\
    HabanaFormResponseSerializer, UserModelSerializer

from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class HabanaFormViewset(viewsets.ViewSet):
    #permission_classes = (IsAuthenticated, )
    
    def list(self, request):
        queryset = HabanaForm.objects.all()
        serializer = HabanaFormSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = HabanaFormSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'HabanaForm created.'})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):
        queryset = HabanaFormField.objects.filter(stage=pk)
        serializer = HabanaFormSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def destroy(self, request, pk=None):
        habana_form = HabanaForm.objects.filter(id=pk).first()
        habana_form.delete()
        return Response({'message':'HabanaForm Deleted.'})


class HabanaFormResponseViewset(viewsets.ViewSet):
    #permission_classes = (IsAuthenticated, )

    def list(self, request):
        queryset = HabanaFormResponse.objects.all()
        serializer = HabanaFormResponseSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = HabanaFormResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Response created!'})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):
        queryset = HabanaFormResponse.objects.filter(stage=pk)
        serializer = HabanaFormResponseSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        pass


class UserViewset(viewsets.ViewSet):

    def list(self, request):
        queryset = UserModel.objects.all()
        serializer = UserModelSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = serializer.data
            print(user)
            return Response({'user': user, 'token':get_tokens_for_user(user) ,'message': 'User Created!'})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    def retrieve(self, request, pk=None):
        queryset = UserModel.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserModelSerializer(user)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        pass


