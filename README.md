# Pour démarrer

Le site est réalisé en [Next.js](https://nextjs.org/)

## Les pages

### FR

- http://localhost:3000/next-web-markdown/fr/
- http://localhost:3000/next-web-markdown/fr/docs

### EN

- http://localhost:3000/next-web-markdown/en/
- http://localhost:3000/next-web-markdown/en/docs

## Lancement du projet en local

```bash
pnpm install
```

```bash
pnpm dev
```

## Todos

- [X] Renommage de la config "app.config.json" en "app.config.ts".
- [X] Fichier json par langue pour les textes fixe par page / composant.
  - [X] Changement de la configuration pour la placer dans le fichier global "app.config.ts".
  - [X] Mise en place de la traduction sur toute l'application.
- [X] Lien des pages de la navigation principal en multi dans le fichier global "app.config.ts".
- [X] Recherche plus complète
- [X] Toggle sur le button dark mode
- [X] Configuration dev / production
- [ ] Génération d'un flux feed.xml
- [ ] Faire la page 404