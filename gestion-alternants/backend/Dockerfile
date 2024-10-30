# Dockerfile pour le backend Django
FROM python:3.9

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie le reste des fichiers de l'application
COPY . .

# Expose le port sur lequel Django écoute
EXPOSE 8000

# Commande pour démarrer l'application Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
