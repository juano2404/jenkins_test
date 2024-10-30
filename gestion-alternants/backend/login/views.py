# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status,generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.models import User 
from .serializers import PasswordResetSerializer
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)  # Ajoutez ceci pour voir les données de la requête
        
        refresh_token = request.data.get("refresh_token", None)
        
        # Vérifier si le refresh_token est fourni
        if refresh_token is None:
            return Response({"detail": "Token non fourni."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Créer un objet RefreshToken
            token = RefreshToken(refresh_token)
            
            # Blacklist le token
            token.blacklist()
            
            return Response({"detail": "Déconnexion réussie."}, status=status.HTTP_200_OK)

        except ValidationError as e:
            # En cas de problème avec le token (ex: token invalide ou expiré)
            return Response({"detail": "Token invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)


        except Exception as e:
            # Pour toute autre erreur
            return Response({"detail": "Erreur lors de la déconnexion."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CheckAuthenticationAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Récupérer les informations de l'utilisateur
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "nom": user.first_name,
            "prenom": user.last_name,
            # Si tu as d'autres champs spécifiques à l'utilisateur, tu peux les ajouter ici
        }

        # Ajouter des informations spécifiques à l'apprenti ou à la coordinatrice
        if hasattr(user, 'apprenti'):
            user_data['user_type'] = 'apprenti'
            user_data['date_naissance'] = user.apprenti.date_naissance
            # Ajoute d'autres champs spécifiques à Apprenti si nécessaire
        elif hasattr(user, 'coordinateur'):
            user_data['user_type'] = 'coordinateur'
            # Ajoute d'autres champs spécifiques à Coordinateur si nécessaire

        return Response(user_data, status=200)


class PasswordResetAPIView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        
        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            
            # Remplacez l'URL par celle de votre frontend
            reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"
            
            send_mail(
                'Réinitialisation du mot de passe',
                f'Pour réinitialiser votre mot de passe, cliquez sur le lien suivant : {reset_link}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            return Response({'detail': 'Un e-mail de réinitialisation a été envoyé.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Cet e-mail n\'est pas associé à un compte.'}, status=status.HTTP_400_BAD_REQUEST)
        
class PasswordResetViewSubmission(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        uid = serializer.validated_data['uid']
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)

            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({"detail": "Le mot de passe a été réinitialisé avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Le lien de réinitialisation du mot de passe est invalide."}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "L'utilisateur n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)


