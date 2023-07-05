FROM node:lts-alpine AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=connect-javascript --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:lts-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache --upgrade bash

WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/apps/connect-javascript/.env .env
COPY .gitignore .gitignore
COPY turbo.json turbo.json

RUN yarn install
RUN yarn turbo run build --filter=connect-javascript...

FROM nginx:alpine

COPY --from=installer app/apps/connect-javascript/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

WORKDIR /app
RUN apk add --no-cache bash

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
COPY --from=installer /app/node_modules /usr/share/nginx/html/node_modules
COPY --from=installer /app/apps/connect-javascript/index.html /usr/share/nginx/html
COPY --from=installer /app/apps/connect-javascript/env-config.js /usr/share/nginx/html
