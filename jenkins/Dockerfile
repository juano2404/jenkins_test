# Utiliser l'image officielle Jenkins LTS
FROM jenkins/jenkins:lts

# Permet à Jenkins de lancer des conteneurs Docker
USER root

# Installer Docker
RUN apt-get update && \
    apt-get install -y docker.io && \
    # Installer Docker Compose
    apt-get install -y curl && \
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Revenir à l'utilisateur Jenkins pour la sécurité
USER jenkins
