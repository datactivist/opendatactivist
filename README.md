A website to learn data and open data, based on Next.js.

## To clone and run on your local setup :

> **Warning**  
> You need to have node installed (v12 or later release)

Clone this repository :

```bash
git clone https://github.com/datactivist/opendatactivist.git
cd opendatactivist
```

Install dependencies :

```bash
npm install
```

## Cartographie

Les fonds de carte CARTO nécessitent une clé API. Demandez une clé sur [CARTO](https://carto.com/basemaps/apikey/), puis définissez `NEXT_PUBLIC_CARTO_API_KEY` dans `.env.local` pour le développement et dans les variables d'environnement de l'hébergement pour le site en production. Les clés de fond de carte sont utilisées dans le navigateur ; limitez leur usage aux domaines du site depuis CARTO.

Run the server in development mode :

```bash
npm run dev
```

By default, the development server is accessible at the following address: http://localhost:3000.

## Contributing

If you wish to contribute in any forms, please read the [contributing guidelines](/CONTRIBUTING.md) on how you can do so.
