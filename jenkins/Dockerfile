# Utiliser l'image officielle Jenkins LTS
FROM jenkins/jenkins:lts

# Permet à Jenkins de lancer des conteneurs Docker
USER root
RUN apt-get update && apt-get install -y docker.io

# Revenir à l'utilisateur Jenkins pour la sécurité
USER jenkins
