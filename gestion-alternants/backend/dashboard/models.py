from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Formation(models.Model):
    # Un ID sera créé automatiquement comme clé primaire par Django
    intitule = models.CharField(max_length=255)  # Le nom de la formation

    def __str__(self):
        return self.intitule  # Pour afficher l'intitulé de la formation dans l'admin

class Apprenti(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Autres champs spécifiques à l'apprenti
    date_naissance = models.DateField()
    promotion = models.ForeignKey(Formation, on_delete=models.CASCADE, default=1)  # Changez '1' par l'ID d'une instance de Formation existante

    def __str__(self):
        return self.user.username  

class Enseignant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Autres champs spécifiques à l'entreprise
    matière = models.CharField(max_length=100)
    def __str__(self):
        return self.user.last_name  

class Entreprise(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nom = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nom 
    
class Coordinateur(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.user.username  