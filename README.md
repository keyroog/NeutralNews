# NeutralNews

Applicazione Web per la ricerca e la sentiment analysis di notizie. L'applicazione utilizza un meccanismo di autenticazione che sfrutta il servizio Azure Storage per memorizzare le informazioni dei singoli Utenti. Al momento della registrazione l'utente può scegliere quali categorie inserire all'interno dei preferiti. Grazie a questo l'applicazione si occupa di Caricare in HomePage le trending news in base alle categorie selezionate. L'Utente dispone inoltre di una barra di ricerca per la ricerca di articoli specifici.
Sulla base della sentiment analysis degli articoli, l'utente è in grado di filtrare i contenuti per "POSITIVI", "NEGATIVI" e "NEUTRALI".

## Registrazione ed Accesso

L'applicazione utilizza il servizio Azure Storage per memorizzare le informazioni relative ai diversi utenti dell'applicazione.

## Ricerca

L'applicazione utilizza il servizio Azure Bing Search V7 per effettuare le diverse ricerche (Per parola o per categoria).

## Sentiment Analysis

L'applicazione utilizza il servizio Language di Azure Cognitive Services per effettuare la sentiment analysis delle notizie recuperate da bing

## Presentazione

L'applicazione è sviluppata utilizzando il framework Angular. Utilizzando un approccio serverless mediante il servizio Azure Functions, l'applicazione risulta essere molto snella e veloce.
