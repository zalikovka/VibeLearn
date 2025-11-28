from django.db import models


class Block(models.Model):
    """
    Abstract base model for all spell blocks.
    Provides common fields and behavior for block inheritance.
    """
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class TargetType(models.Model):
    """Target types: enemy, spot, caster"""
    ENEMY = 'enemy'
    SPOT = 'spot'
    CASTER = 'caster'
    
    TARGET_CHOICES = [
        (ENEMY, 'Enemy Target'),
        (SPOT, 'Ground Spot'),
        (CASTER, 'Self (Caster)'),
    ]
    
    name = models.CharField(max_length=20, choices=TARGET_CHOICES, unique=True)
    icon = models.CharField(max_length=10, default='🎯')
    
    def __str__(self):
        return self.get_name_display()


class MagicSchool(models.Model):
    """Magic schools: fire, water, air"""
    FIRE = 'fire_school'
    WATER = 'water_school'
    AIR = 'air_school'
    
    SCHOOL_CHOICES = [
        (FIRE, 'Fire School'),
        (WATER, 'Water School'),
        (AIR, 'Air School'),
    ]
    
    name = models.CharField(max_length=20, choices=SCHOOL_CHOICES, unique=True)
    icon = models.CharField(max_length=10, default='📚')
    
    def __str__(self):
        return self.get_name_display()


class ProjectileForm(models.Model):
    """Projectile forms: sphere, pellets"""
    SPHERE = 'sphere'
    PELLETS = 'pellets'
    
    FORM_CHOICES = [
        (SPHERE, 'Sphere'),
        (PELLETS, 'Pellets'),
    ]
    
    name = models.CharField(max_length=20, choices=FORM_CHOICES, unique=True)
    icon = models.CharField(max_length=10, default='💫')
    
    def __str__(self):
        return self.get_name_display()


class Spell(models.Model):
    """
    A complete spell configuration made up of connected blocks.
    Represents the full spell chain created by the user.
    """
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Block connections
    target = models.ForeignKey(
        TargetType, 
        on_delete=models.PROTECT,
        related_name='spells'
    )
    magic_school = models.ForeignKey(
        MagicSchool, 
        on_delete=models.PROTECT,
        related_name='spells'
    )
    projectile_form = models.ForeignKey(
        ProjectileForm, 
        on_delete=models.PROTECT,
        related_name='spells'
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.magic_school} - {self.projectile_form})"
