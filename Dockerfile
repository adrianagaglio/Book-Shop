# Node.js con Alpine Linux come base per un'immagine leggera
FROM node:18-alpine

# Directory di lavoro
WORKDIR /app

# Copia dei file nella directory
COPY . .

# Server http per servire l'applicazione
RUN npm install -g http-server

# Esposizione porta 4200
EXPOSE 4200

# Comando per avviare il server quando il container viene eseguito
CMD ["http-server", "-p", "4200"]