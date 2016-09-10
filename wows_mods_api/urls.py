from django.conf.urls import url, include
from rest_framework import routers
from wows_mods_api.views import MLModificationViewSet, MLFileViewSet, MLVideoViewSet, MLImageViewSet

router = routers.DefaultRouter()
router.register(r'modifications', MLModificationViewSet)
router.register(r'files', MLFileViewSet)
router.register(r'videos', MLVideoViewSet)
router.register(r'screenshots', MLImageViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]