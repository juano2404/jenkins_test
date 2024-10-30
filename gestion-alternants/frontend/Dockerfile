# Étape de construction
FROM node:16 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package.json package-lock.json ./
RUN npm install

RUN npm install axios
# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape de production
FROM nginx:alpine

# Copier les fichiers de build vers le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut pour Nginx
CMD ["nginx", "-g", "daemon off;"]
