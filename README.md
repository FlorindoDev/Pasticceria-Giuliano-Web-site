# Pasticceria Giuliano

Applicazione full-stack per raccontare e vendere i dolci artigianali di Pasticceria Giuliano.  
Il repository contiene:

- **Frontend Angular 20** (directory `front_end/Pasticceria-Giuliano`): landing page, catalogo, dettaglio prodotto, carrello, storico ordini e modali di login/signup.
- **Backend Node.js + Express 5** (directory `back_end`): API REST con autenticazione JWT, gestione prodotti/ingredienti, indirizzi di spedizione, carrelli, ordini ed integrazione Stripe + Google Cloud Storage.
- **docker-compose** per avviare frontend (Nginx) e backend in container separati.

---

## Indice

1. [Stack Tecnologico](#stack-tecnologico)  
2. [Funzionalità Chiave](#funzionalità-chiave)  
3. [Struttura del Repository](#struttura-del-repository)  
4. [Prerequisiti](#prerequisiti)  
5. [Configurazione Variabili d’Ambiente](#configurazione-variabili-dambiente)  
6. [Avvio in Locale](#avvio-in-locale)  
7. [Avvio con Docker Compose](#avvio-con-docker-compose)  
8. [Panoramica API](#panoramica-api)  
9. [Frontend in dettaglio](#frontend-in-dettaglio)  
10. [Pagamenti e Servizi Esterni](#pagamenti-e-servizi-esterni)  
11. [Testing](#testing)  
12. [Troubleshooting](#troubleshooting)  
13. [Contribuire](#contribuire)

---

## Stack Tecnologico

- **Frontend**: Angular 20 (standalone components, Angular Signals, RxJS 7.8), Tailwind CSS, ngx-toastr, Nginx (prod).
- **Backend**: Node 20, Express 5, Sequelize 6, Postgres, JWT, Stripe SDK, Multer + Google Cloud Storage, Swagger UI.
- **Infra**: Docker Compose, TLS (cert/key locali per frontend e backend), Morgan per i log, Jest + Supertest per i test API.

---

## Funzionalità Chiave

### Esperienza utente
- Landing page con hero e vetrina dei dolci, catalogo filtrato per tag e pagine dettaglio prodotto con ingredienti.
- Modali di **login** e **registrazione** con validazione reactive forms, Toast di feedback e gestione password (show/hide).
- **Carrello persistente** per utente autenticato: crea il carrello alla prima visita, aggiorna quantità, elimina item e calcola totali.
- **Checkout Stripe** con redirect automatico; il blocco note spedizione viene inviato come metadata.
- Pagina **ordini** con riepilogo totale, ultimo ordine e filtro per stato.
- Interceptors HTTP per allegare il token, mostrare overlay di caricamento e gestire errori lato UI.
- Protezione delle rotte `/cart` e `/order` tramite `authGuard`.

### API & dominio
- **Autenticazione JWT** (signup, login, logout lato client).
- **Gestione prodotti** con ruoli: amministratori possono creare, aggiornare, eliminare prodotti e ingredienti, con upload immagini su Google Cloud Storage.
- **Gestione ingredienti** (CRUD legato al prodotto) per mostrare le info nutrizionali nel frontend.
- **Anagrafiche utenti** e **residenze** (massimo due indirizzi, enforcement lato backend).
- **Carrelli** e **cart item** multi-prodotto con verifica quantità e costo.
- **Ordini** persistiti via webhook Stripe, inclusi prodotti acquistati e indirizzi dell’utente.
- **Swagger UI** su `/api-docs` per navigare l’intero contratto REST.

---

## Struttura del Repository

```
Pasticceria-Giuliano Web site/
├── docker-compose.yaml
├── back_end/
│   ├── controllers/        # Auth, Products, Ingredients, Cart, Orders, Payments...
│   ├── routes/             # auth, products, users, cart, residence, payment, orders
│   ├── middleware/         # JWT, ruoli, upload GCS, Stripe webhook, Zod validator
│   ├── models/             # Sequelize models + associazioni
│   ├── schemas/            # Schemi Zod per validare body/query/params
│   ├── utils/              # Error handling condiviso
│   └── tests/              # Jest + Supertest
└── front_end/
    └── Pasticceria-Giuliano/
        ├── src/app/        # Componenti standalone, servizi, guard, interceptors
        ├── public/         # Asset statici (immagini prodotti, fonts)
        ├── ssl/            # Certificati per Nginx in HTTPS
        └── Dockerfile      # Build Angular + Nginx
```

---

## Prerequisiti

- Node.js **>= 20** e npm.
- Angular CLI (opzionale: `npm install -g @angular/cli` per sviluppare in locale).
- Docker + Docker Compose per l’avvio containerizzato.
- Un database PostgreSQL raggiungibile (locale o cloud).
- Credenziali Google Cloud Storage (service account abilitate ad accedere al bucket immagini).
- Credenziali Stripe (secret key + webhook signing secret).
- Certificati TLS (self-signed o reali) se vuoi esporre HTTPS sui container.

---

## Configurazione Variabili d’Ambiente

### Backend – `back_end/.env`

```env
DB_CONNECTION_URI=postgres://user:password@host:5432/database
DIALECT=postgres
TOKEN_SECRET=super-secret-jwt-key
END_POINT_ALLOWED=http://localhost:4200

PORT=3000                     # 3000 -> HTTP, 443/3001 -> HTTPS con i cert indicati sotto
PATH_KEY_PEM=./ssl/key.pem
PATH_CERT_PEM=./ssl/cert.pem

GOOGLE_APPLICATION_CREDENTIALS=./pasticceria-service-account.json
BUCKET_NAME=dolci-giuliano

INIT_DATA=false               # flag custom per eventuale bootstrap (opzionale)
STRIPE_TOKEN=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**Note:**
- `END_POINT_ALLOWED` viene usato sia da CORS sia per reindirizzare l’utente al cancel URL Stripe.
- Quando `PORT` è `443` o `3001`, `index.js` avvia un server HTTPS utilizzando `PATH_KEY_PEM` e `PATH_CERT_PEM`.
- La service account JSON deve essere disponibile all’interno del container (aggiungi il file alla directory indicata o usa segreti Docker).

### Frontend – `front_end/Pasticceria-Giuliano/src/app/environment.prod.ts`

```ts
export const environment = {
  apiBaseUrl: 'http://localhost:3000',
  myErrors: [400, 401, 403, 404, 409, 500, 503],
};
```

- `apiBaseUrl` deve puntare al backend (HTTP o HTTPS).
- `myErrors` permette all’interceptor di distinguere errori gestiti da quelli generici.

---

## Avvio in Locale

### Backend

```bash
cd back_end
npm install
npm run startDev   # usa nodemon in watch
# oppure npm start per avvio semplice
```

- Lancia il backend su `http://localhost:3000` (o HTTPS se configuri i cert).  
- Swagger disponibile su `http://localhost:3000/api-docs`.

### Frontend

```bash
cd front_end/Pasticceria-Giuliano
npm install
npm start          # alias di ng serve
```

- Lancia Angular dev server su `http://localhost:4200` con HMR.
- Assicurati che `END_POINT_ALLOWED` nel backend includa `http://localhost:4200`.

---

## Avvio con Docker Compose

1. Imposta i file `.env` e i certificati in entrambe le cartelle (`back_end/ssl`, `front_end/Pasticceria-Giuliano/ssl`).
2. Dalla root:

```bash
docker compose up -d --build
```

- `server-web`: build Angular, serve con Nginx su `80` e `443`.
- `node-app`: backend Node su `3000` (HTTP) e `3001` (HTTPS).
- Modifica `docker-compose.yaml` se vuoi aggiungere un container Postgres locale o servizi extra.

Per spegnere:

```bash
docker compose down
```

---

## Panoramica API

Swagger UI: **`http://localhost:3000/api-docs`**
