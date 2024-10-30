from django.urls import path
from .views import ListeEntreprisesAPIView,AjouterEntrepriseAPIView,CreateUserAPIView,AssignUserToEntrepriseAPIView,EntrepriseDeleteView

urlpatterns = [
    path('entreprises/', ListeEntreprisesAPIView.as_view(), name='liste-entreprises'),
    path('entreprises/ajouter/', AjouterEntrepriseAPIView.as_view(), name='ajouter-entreprise'),
    path('users/create/', CreateUserAPIView.as_view(), name='create-user'),
    path('entreprises/assign-user/', AssignUserToEntrepriseAPIView.as_view(), name='assign-user-to-entreprise'),
    path('entreprises/delete/<int:pk>/', EntrepriseDeleteView.as_view(), name='entreprise-delete'),  # <int:pk> pour l'ID de l'entreprise
]
