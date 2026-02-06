# DC Paceline

A community cycling rides listing for Washington, DC.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [fnm](https://github.com/Schniz/fnm) with `.node-version`)
- A Sanity account (free tier)

### Setup

```bash
git clone git@github.com:stephenmckinney/dc-paceline.git
cd dc-paceline
npm install
npx sanity login
npx sanity cors add http://localhost:4321 --credentials
```

### Run locally

```bash
npm run dev
```

Open <http://localhost:4321> (site) or <http://localhost:4321/admin> (CMS).

### Verify

```bash
npx astro check   # Type check
npm test          # Run tests
```

## More Info

See [DEVELOPMENT.md](DEVELOPMENT.md) for architecture, project structure, deployment, and other technical details.

## License

MIT
