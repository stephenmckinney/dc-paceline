# Development Guide

Technical reference for developing and maintaining DC Paceline.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Sanity Studio  │────▶│   Sanity API    │────▶│   Astro Build   │
│   (/admin)      │     │  (Content Lake) │     │                 │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │ Cloudflare Pages│
                                                │  (Static Host)  │
                                                └─────────────────┘
```

| Component | Technology                  | Purpose                           |
| --------- | --------------------------- | --------------------------------- |
| Frontend  | Astro 6                     | Static site generator             |
| CMS       | Sanity                      | Headless CMS with embedded Studio |
| Hosting   | Cloudflare Pages            | Free static hosting with CDN      |
| CI/CD     | Cloudflare + Sanity Webhook | Auto-deploy on content publish    |

## Project Structure

```
dc-paceline/
├── src/
│   ├── pages/
│   │   ├── index.astro        # Homepage - lists rides
│   │   └── admin/
│   │       └── index.astro    # Sanity Studio (embedded)
│   └── components/
│       └── Studio.tsx         # React wrapper for Sanity Studio
├── sanity/
│   ├── schema.ts              # Content schema definitions
│   ├── sanity.config.ts       # Studio configuration
│   └── client.ts              # Sanity client for data fetching
├── sanity.cli.ts              # CLI config for Sanity commands
├── astro.config.mjs           # Astro configuration
├── wrangler.jsonc             # Cloudflare Pages configuration
└── package.json
```

## Commands

| Command                                   | Action                                   |
| ----------------------------------------- | ---------------------------------------- |
| `npm run dev`                             | Start local dev server at localhost:4321 |
| `npm run build`                           | Build production site to `./dist/`       |
| `npm run preview`                         | Preview production build locally         |
| `npm test`                                | Run tests (vitest)                       |
| `npm run test:watch`                      | Run tests in watch mode                  |
| `npx astro check`                         | Type check the project                   |
| `npx sanity login`                        | Authenticate with Sanity CLI             |
| `npx sanity cors add <url> --credentials` | Add CORS origin for Studio               |

## Deployment

### Cloudflare Pages Setup

1. Connect your GitHub repo in [Cloudflare Dashboard](https://dash.cloudflare.com/login) → Workers & Pages
2. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

### Sanity Webhook (Auto-deploy on publish)

1. **Create deploy hook in Cloudflare:**
   - Workers & Pages → dc-paceline → Settings → Builds → Deploy hooks
   - Create hook named "sanity", copy the URL

2. **Create webhook in Sanity:**
   - [manage.sanity.io](https://manage.sanity.io) → Project → API → Webhooks
   - Name: `Cloudflare Deploy`
   - URL: paste Cloudflare hook URL
   - Trigger on: Create, Update, Delete

Now publishing content in Sanity automatically triggers a rebuild.

### CORS Origins

Add production URL to Sanity CORS:

```bash
npx sanity cors add https://dc-paceline.pages.dev --credentials
```

## Environment

No `.env` file required - the Sanity project ID is public and safe to commit. The Sanity dataset is read-only via CDN for the frontend; write access requires authentication through the Studio.
