# Zaenalos Portfolio (Next.js + TypeScript)

This portfolio has been migrated from a static HTML/CSS setup to **Next.js (App Router)**.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Quality Tools (Biome)

```bash
npm run lint
npm run lint:fix
npm run format
```

## Project Notes

- `app/layout.tsx`: global layout, metadata, and global styles.
- `app/page.tsx`: renders the portfolio page content.
- `app/portfolio-client.tsx`: typed client behavior (AOS, Three.js background, dynamic section rendering).
- `public/data/*.json`: competition and timeline content used by the page script.
- `biome.json`: Biome lint/format configuration.