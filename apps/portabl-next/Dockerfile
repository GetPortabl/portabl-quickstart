FROM node:lts-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=portabl-next --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/apps/portabl-next/.env .env
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
RUN yarn turbo run build --filter=portabl-next...

FROM node:lts-alpine AS runner
WORKDIR /app
RUN apk add --no-cache bash

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/portabl-next/next.config.js .
COPY --from=installer /app/apps/portabl-next/package.json .

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/portabl-next/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/portabl-next/.next/static ./apps/portabl-next/.next/static

CMD node apps/portabl-next/server.js
