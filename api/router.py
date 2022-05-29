from rest_framework.routers import DefaultRouter
from api.viewsets import HabanaFormViewset, HabanaFormResponseViewset, \
    UserViewset

router = DefaultRouter()
router.register(r'habanaforms', HabanaFormViewset, basename='habanaforms')
router.register(r'users', UserViewset, basename='users')
router.register(r'habanaformresponse', HabanaFormResponseViewset, basename='habanaformresponse')
urlpatterns = router.urls
