# Docker quickstart for this project

This repo contains a static site (HTML/CSS/JS) at the repository root and a Node + TypeScript backend in `backend/`.

Files added:
- `Dockerfile.frontend` — serves static site using nginx
- `backend/Dockerfile` — builds TypeScript backend and runs the compiled `dist/index.js`
- `docker-compose.yml` — simple configuration to run frontend and backend together

Quick build & run (requires Docker and docker-compose):

1) Build images and start services

   docker compose up --build

2) Visit the site at http://localhost (frontend served on port 80) and backend API at http://localhost:3000

Notes and recommendations
- Backend:
  - The backend listens on `PORT` (defaults to 3000). `backend/package.json` uses `npm run build` (tsc) and `node dist/index.js` to start.
  - Put secrets and environment variables into `backend/.env` and don't commit that file. `docker-compose.yml` mounts `backend/.env` (read-only) into the container by default. Adjust as needed.

- Frontend:
  - The frontend Dockerfile copies the repository root into nginx's web root. If you later switch to a build step (for a bundler), change the Dockerfile to copy only the build output (for example `dist/` or `build/`).

- Development vs Production:
  - For local development you may prefer mounting local folders as volumes in `docker-compose` so edits are reflected instantly.
  - For production, build a minimal image that only contains compiled assets and runtime dependencies.

  Development workflow (recommended)
  - Use the included `docker-compose.override.yml` during development. It mounts your source folders into containers and runs the backend in development mode (`npm run dev`) so edits are picked up immediately.

  Run development stack:

    docker compose up

  This runs the override automatically (docker-compose merges `docker-compose.yml` with `docker-compose.override.yml`).

  Files added for dev & security
  - `.dockerignore` — avoids copying backend and secrets into the frontend image
  - `backend/.dockerignore` — keeps backend build artifacts and secrets out of images
  - `nginx.conf` — custom nginx config with gzip and security headers
  - `docker-compose.override.yml` — mounts sources for live development (nodemon)

  Security & health
  - The backend runtime image now runs a non-root user (`app`) and includes a Docker HEALTHCHECK that probes `/health` every 30s. Your orchestrator (Docker, ECS, Kubernetes) can use that to detect a bad process and restart it.

  Next steps (optional)
  - Add a CI pipeline step that builds and scans images for vulnerabilities.
  - For production, consider building frontend assets (minified) into a `build/` folder and updating `Dockerfile.frontend` to COPY only the build output.
  - If you want, I can add a `docker-compose.ci.yml` for CI-friendly cached builds.

Security
- Do not commit `.env` files or secrets. Use a secrets manager or environment variables from your deployment platform (e.g., ECS, Kubernetes, Azure App Service).

Troubleshooting
- If the backend fails to start, run `docker compose logs backend` and inspect the build logs. Ensure `npm run build` in `backend` completes without TypeScript errors.
