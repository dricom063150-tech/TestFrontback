# TestFrontback

Formulaire simple qui envoie les réponses vers Supabase via une API backend sécurisée.

## Prérequis

- Node.js 18 ou plus récent
- Un fichier `env.local` à la racine contenant vos variables Supabase :

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
# ou SUPABASE_ANON_KEY si vous n'avez pas encore de clé de service
```

## Démarrage

Installez les dépendances puis démarrez le serveur Express qui expose la route API et sert le frontend statique :

```bash
npm install
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000). Le formulaire appelle `POST /api/opinions`, qui se charge d'écrire dans Supabase côté serveur.
