from rest_framework import serializers
from .models import TargetType, MagicSchool, ProjectileForm, Spell


class TargetTypeSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='get_name_display', read_only=True)
    
    class Meta:
        model = TargetType
        fields = ['id', 'name', 'label', 'icon']


class MagicSchoolSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='get_name_display', read_only=True)
    
    class Meta:
        model = MagicSchool
        fields = ['id', 'name', 'label', 'icon']


class ProjectileFormSerializer(serializers.ModelSerializer):
    label = serializers.CharField(source='get_name_display', read_only=True)
    
    class Meta:
        model = ProjectileForm
        fields = ['id', 'name', 'label', 'icon']


class SpellSerializer(serializers.ModelSerializer):
    target_detail = TargetTypeSerializer(source='target', read_only=True)
    magic_school_detail = MagicSchoolSerializer(source='magic_school', read_only=True)
    projectile_form_detail = ProjectileFormSerializer(source='projectile_form', read_only=True)
    
    class Meta:
        model = Spell
        fields = [
            'id', 'name', 'description',
            'target', 'target_detail',
            'magic_school', 'magic_school_detail',
            'projectile_form', 'projectile_form_detail',
            'created_at', 'updated_at'
        ]


class SpellCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating spells"""
    
    class Meta:
        model = Spell
        fields = ['name', 'description', 'target', 'magic_school', 'projectile_form']
