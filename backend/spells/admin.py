from django.contrib import admin
from .models import (
    TargetType,
    MagicSchool,
    ProjectileForm,
    Spell,
)


@admin.register(TargetType)
class TargetTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "icon")
    list_filter = ("name",)
    search_fields = ("name",)
    ordering = ("id",)


@admin.register(MagicSchool)
class MagicSchoolAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "icon")
    list_filter = ("name",)
    search_fields = ("name",)
    ordering = ("id",)


@admin.register(ProjectileForm)
class ProjectileFormAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "icon")
    list_filter = ("name",)
    search_fields = ("name",)
    ordering = ("id",)


@admin.register(Spell)
class SpellAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "magic_school",
        "projectile_form",
        "target",
        "created_at",
    )
    list_filter = (
        "magic_school",
        "projectile_form",
        "target",
        "created_at",
    )
    search_fields = ("name", "description")
    ordering = ("-created_at",)