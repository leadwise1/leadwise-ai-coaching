# 1. Install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# 2. Build the application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Dummy env vars so next build doesn’t fail
ENV GOOGLE_CLOUD_PROJECT_ID="dummy-project-for-build"
ENV GOOGLE_CLOUD_LOCATION="dummy-location-for-build"

RUN npm install -g pnpm && pnpm run build

# 3. Run the application
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# Launch Next.js standalone server
CMD ["node", "server.js"]