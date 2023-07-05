FROM node:lts-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=connect-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat


WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/apps/connect-api/.env .env
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
RUN yarn turbo run build --filter=connect-api...

FROM node:lts-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/connect-api/dist/index.js

