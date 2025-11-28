from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'targets', views.TargetTypeViewSet)
router.register(r'schools', views.MagicSchoolViewSet)
router.register(r'forms', views.ProjectileFormViewSet)
router.register(r'spells', views.SpellViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('block-options/', views.block_options, name='block-options'),
]
