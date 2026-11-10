# Technical Stack

## Frontend

- Next.js `^16.3.2`
- React and React DOM `19.2.8`
- TypeScript `5.9.3`
- CSS in `app/globals.css`

## Build and deployment

- Next.js static export when `GITHUB_PAGES=true`
- `gh-pages` `^6.3.0` publishes `out/` to the `gh-pages` branch
- GitHub Pages source: `gh-pages` branch, `/` path

## Data and auth

- No backend, database, or application authentication.
- Browser `localStorage` stores device-local draft settings.

## Testing

- `npm run build:github` validates the GitHub Pages static export.
- Check deployed HTML and its hashed stylesheet endpoint return HTTP 200.
