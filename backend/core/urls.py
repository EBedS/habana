"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from api.views import random_evaluation, get_current_user, get_stages_state_by_user


urlpatterns = [
    path('admin/', admin.site.urls),
    path('markdownx/', include('markdownx.urls')),
    path('', include('api.router')),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('random_evaluation/', random_evaluation, name = 'random_evaluation'),
    path('api/current_user/', get_current_user, name = 'current_user'),
    path('api/stages_status/', get_stages_state_by_user, name = 'stages_status'),
]


