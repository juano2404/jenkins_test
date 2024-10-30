from django.test import TestCase

# Create your tests here.



from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


class LogoutViewTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()

    def test_logout_successful(self):
        # Générer et utiliser un token pour se déconnecter
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        response = self.client.post(reverse('logout'), {'refresh_token': str(refresh)})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Déconnexion réussie.')

    def test_logout_no_token(self):
        # Tente une déconnexion sans token fourni
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {RefreshToken.for_user(self.user).access_token}')
        response = self.client.post(reverse('logout'))

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Token non fourni.')

    def test_logout_invalid_token(self):
        # Tente une déconnexion avec un token invalide
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {RefreshToken.for_user(self.user).access_token}')
        response = self.client.post(reverse('logout'), {'refresh_token': 'invalid_token'})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], 'Token invalide ou expiré.')

class CheckAuthenticationAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.client = APIClient()

    def test_authenticated_user(self):
        # Authentifier et vérifier les informations de l'utilisateur
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('check-authentication'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_unauthenticated_user(self):
        # Vérifier qu'un utilisateur non authentifié ne peut pas accéder
        response = self.client.get(reverse('check-authentication'))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


from django.core import mail

class PasswordResetAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')

    def test_password_reset_email_sent(self):
        response = self.client.post(reverse('password-reset'), {'email': 'test@example.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], 'Un e-mail de réinitialisation a été envoyé.')
        self.assertEqual(len(mail.outbox), 1)  # Vérifie qu'un email est envoyé
        self.assertIn('Réinitialisation du mot de passe', mail.outbox[0].subject)

    def test_password_reset_email_not_found(self):
        response = self.client.post(reverse('password-reset'), {'email': 'unknown@example.com'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "Cet e-mail n'est pas associé à un compte.")


class PasswordResetViewSubmissionTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='old_password')

    def test_password_reset_successful(self):
        # Obtenez l'UID et le token pour la réinitialisation du mot de passe
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = default_token_generator.make_token(self.user)
        response = self.client.post(reverse('password-reset-submit'), {
            'uid': uid,
            'token': token,
            'new_password': 'new_password123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['detail'], "Le mot de passe a été réinitialisé avec succès.")
        # Vérifie que le mot de passe a été mis à jour
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('new_password123'))

    def test_password_reset_invalid_token(self):
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        response = self.client.post(reverse('password-reset-submit'), {
            'uid': uid,
            'token': 'invalid_token',
            'new_password': 'new_password123'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "Le lien de réinitialisation du mot de passe est invalide.")

    def test_password_reset_user_not_found(self):
        # UID pour un utilisateur inexistant
        uid = urlsafe_base64_encode(force_bytes(99999))
        token = default_token_generator.make_token(self.user)
        response = self.client.post(reverse('password-reset-submit'), {
            'uid': uid,
            'token': token,
            'new_password': 'new_password123'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['detail'], "L'utilisateur n'existe pas.")
