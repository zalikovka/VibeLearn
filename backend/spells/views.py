from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TargetType, MagicSchool, ProjectileForm, Spell
from .serializers import (
    TargetTypeSerializer,
    MagicSchoolSerializer,
    ProjectileFormSerializer,
    SpellSerializer,
    SpellCreateSerializer
)


class TargetTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for target types (read-only)"""
    queryset = TargetType.objects.all()
    serializer_class = TargetTypeSerializer


class MagicSchoolViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for magic schools (read-only)"""
    queryset = MagicSchool.objects.all()
    serializer_class = MagicSchoolSerializer


class ProjectileFormViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for projectile forms (read-only)"""
    queryset = ProjectileForm.objects.all()
    serializer_class = ProjectileFormSerializer


class SpellViewSet(viewsets.ModelViewSet):
    """API endpoint for spells (full CRUD)"""
    queryset = Spell.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SpellCreateSerializer
        return SpellSerializer


@api_view(['GET'])
def block_options(request):
    """
    Get all block options in a single request.
    Useful for initializing the spell builder UI.
    """
    return Response({
        'target_types': TargetTypeSerializer(
            TargetType.objects.all(), many=True
        ).data,
        'magic_schools': MagicSchoolSerializer(
            MagicSchool.objects.all(), many=True
        ).data,
        'projectile_forms': ProjectileFormSerializer(
            ProjectileForm.objects.all(), many=True
        ).data,
    })
