from rest_framework.routers import DefaultRouter
from api.viewsets import HabanaFormViewset, UserViewset

router = DefaultRouter()
router.register(r'habanaforms', HabanaFormViewset, basename='habanaforms')
router.register(r'users', UserViewset, basename='users')
urlpatterns = router.urls
