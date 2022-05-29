from rest_framework.routers import DefaultRouter
from api.viewsets import HabanaFormViewset

router = DefaultRouter()
router.register(r'habanaforms', HabanaFormViewset, basename='folder')
urlpatterns = router.urls
