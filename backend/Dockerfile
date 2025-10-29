### Backend Dockerfile (Node + TypeScript)
# Multi-stage build: build TypeScript then copy compiled output into smaller runtime image

FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Install dependencies (including dev deps for building TS)
COPY backend/package*.json ./
RUN npm ci

# Copy source and build
COPY backend/ .
RUN npm run build

### Runtime image
FROM node:18-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install curl for HEALTHCHECK
RUN apk add --no-cache curl

# Copy built artifacts and node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Create a non-root user for improved security
RUN addgroup -S app && adduser -S app -G app
RUN chown -R app:app /usr/src/app

# (Optional) If you use an .env file in backend/, mount it at runtime or copy here
# COPY backend/.env ./

USER app

EXPOSE 3000

# Start the compiled server (matches "start" script in backend/package.json)
CMD ["node", "dist/index.js"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD curl -f http://localhost:3000/health || exit 1
