# Book shop (Demo)

Semplice pagina web con operazioni CRUD e dom manipulation. Web design responsive.

## Eseguire l'applicazione con Docker (consigliato)

- Se non hai Docker installato, segui le istruzioni dal sito ufficiale: [Docker](https://docs.docker.com/desktop/)
- Esegui `docker build . -t book-shop-app` per creare l'immagine dell'applicazione con tutte le dipendenze necessarie al suo funzionamento
- Esegui `docker -d --name book-shop-container -p 4200:4200 book-shop-app:latest` per creare ed eseguire il container per avviare l'applicazione
- Naviga `http://localhost:4200/`

## Eseguire l'applicazione sulla tua macchina locale

- Scaricare la repo
- Aprire index.html con il browser
- oppure, aprire la cartella con IDE (es. Visual Studio Code) ed avviare Live Server
