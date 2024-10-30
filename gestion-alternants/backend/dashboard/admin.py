from django.contrib import admin
from .models import Formation,Apprenti
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User


class UserAdmin(BaseUserAdmin):
    list_display = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']  # Ajouter 'id' ici
    search_fields = ['username', 'email', 'first_name', 'last_name']
    list_filter = ['is_staff', 'is_active']

# Enregistrer le modèle User avec la classe d'administration personnalisée
admin.site.unregister(User)  # Désenregistre l'administration par défaut
admin.site.register(User, UserAdmin)  # Enregistre avec notre UserAdmin
@admin.register(Formation)
class FormationAdmin(admin.ModelAdmin):
    list_display = ['intitule']

from .models import Apprenti, Entreprise, Coordinateur, Enseignant

admin.site.register(Apprenti)

@admin.register(Entreprise)
class EntrepriseAdmin(admin.ModelAdmin):
    list_display = ['id', 'nom']  # Affiche l'ID et le nom de l'entreprise

admin.site.register(Coordinateur)
admin.site.register(Enseignant)