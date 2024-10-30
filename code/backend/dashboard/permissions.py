# permissions.py
from rest_framework.permissions import BasePermission
from .models import Coordinateur

class IsCoordinateur(BasePermission):
    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est lié à une instance de Coordinateur
        return Coordinateur.objects.filter(user=request.user).exists()
