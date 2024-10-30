
from rest_framework import serializers
from .models import Entreprise
from django.contrib.auth.models import User

# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Entreprise


class EntrepriseSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id')

    class Meta:
        model = Entreprise
        fields = ['id', 'nom', 'user_id']  # Incluez l'ID ici

    def create(self, validated_data):
        user = validated_data.pop('user')
        entreprise = Entreprise.objects.create(user=user, **validated_data)
        return entreprise



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Utilisez cette méthode pour hacher le mot de passe
        user.save()
        return user

