from django.contrib import admin
from django.urls import path, include
from core.views import UserViewSet, UserPasswordViewSet, WallViewSet
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'super/users', UserPasswordViewSet)
router.register(r'wall', WallViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls'))
]
