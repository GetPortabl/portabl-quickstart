# Backup with Portabl Quickstart

This repository accompanies [Portabl's quickstart guide for Backup with Portabl](https://portabl.redoc.ly/docs/quickstart/backup) and shows an example of integrating the SDKs required for issuing credentials for your users.

Here you will find necessary steps and samples to get the app running on your machine utilizing our [Server Side Node SDK](/docs/sdk/server-side-sdks/node) and our [Client Side React SDK](/docs/sdk/client-side-sdks/backup/react).

---

## Setup

### Setting up Environment Variables for the sample **"web"** app

Create a `.env` file from `.env.example` in the web directory and fill out the environment variables.

```bash
cp apps/web/.env.example apps/web/.env

```

### Setting up Environment Variables for the sample **"api"** app

Create a `.env` file from `.env.example` in the api directory and fill out the environment variables with respective values from https://console.getportabl.com/api-keys.

```bash
cp apps/api/.env.example apps/api/.env

```

---

## Running the project

To run the quickstart example, you may choose to run it with Docker or without it.

### Running with Docker

This repo is configured to be built with Docker, and Docker Compose.

To build images and run containers:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create portabl

# Start app in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Running without Docker

1. Install dependencies

   ```bash
   yarn
   ```

2. Run both "web" and "api" sample projects in dev mode

   ```bash
   yarn dev
   ```

---

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `api`: an [Express](https://expressjs.com/) server
- `eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
