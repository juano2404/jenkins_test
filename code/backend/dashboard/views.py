from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import IsCoordinateur  # Nous allons créer ce fichier pour gérer les permissions.
from .models import Entreprise
from .serializers import EntrepriseSerializer,UserSerializer
from rest_framework import status 
from django.contrib.auth.models import User
from rest_framework import generics

#Coordinatrice d'apprentissage
class ListeEntreprisesAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCoordinateur]  # Seuls les coordinateurs ont accès

    def get(self, request):
        entreprises = Entreprise.objects.all()  # Récupérer toutes les entreprises
        serializer = EntrepriseSerializer(entreprises, many=True)  # Sérialiser les données
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AjouterEntrepriseAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCoordinateur]

    def post(self, request):
        # Passer les données à serializer
        serializer = EntrepriseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()  # Sauvegarder la nouvelle entreprise
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateUserAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCoordinateur]  # Ajoutez les permissions

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"id": user.id, "username": user.username, "email": user.email}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignUserToEntrepriseAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCoordinateur]

    def post(self, request):
        user_id = request.data.get('user_id')
        nom = request.data.get('nom')

        if user_id is None or nom is None:
            return Response({"user_id": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            entreprise = Entreprise.objects.create(user=user, nom=nom)
            return Response({"message": "User assigned to entreprise successfully."}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({"user_id": ["User does not exist."]}, status=status.HTTP_400_BAD_REQUEST)

class EntrepriseDeleteView(generics.DestroyAPIView):
    queryset = Entreprise.objects.all()
    serializer_class = EntrepriseSerializer
    permission_classes = [IsAuthenticated, IsCoordinateur]  # Vérifie que l'utilisateur est authentifié et est un coordinateur

    def delete(self, request, *args, **kwargs):
        # Récupérer l'entreprise à supprimer par son ID
        entreprise = self.get_object()
        
        # Récupérer l'utilisateur associé à l'entreprise
        user = entreprise.user
        
        # Supprimer l'utilisateur
        user.delete()
        
        # Supprimer l'entreprise
        entreprise.delete()  
        
        return Response(status=204)  # Retourner un statut 204 No Content après suppression

    