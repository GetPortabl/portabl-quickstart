# Backup with Portabl Quickstart

This repository accompanies [Portabl's quickstart guide for Backup with Portabl](https://portabl.redoc.ly/docs/quickstart/backup) and shows an example of integrating the SDKs required for issuing credentials for your users.

Here you will find necessary steps and samples to get the app running on your machine utilizing our [Server Side Node SDK](https://docs.getportabl.com/docs/sdk/server-side-sdks/node/) and our [Client Side React SDK](https://docs.getportabl.com/docs/sdk/client-side-sdks/backup/react/).

---

## Setup

### Setting up Environment Variables

Create a `.env` file from `.env.example` and fill out the environment variables.

```bash
cp .env.example .env

```

---

## Running the project

To run the quickstart example, you may choose to run it with Docker or without it.

### Running with Docker

This repo is configured to be built with Docker, and Docker Compose.

#### Make Commands:

`up`: builds and starts the container
`logs`: tails logs on the container
`stop`: stops the running container

Each of these commands can specify a lib argument which can be one of the available client side libraries: `javascript` or `react`. The default is `javascript`.

#### To start the container:

```
make up lib=node

```

Open http://localhost:3000.

### Running without Docker

1. Install dependencies

   ```bash
   yarn
   ```

2. Run both frontend and "api" sample projects in dev mode

You can chose one of the preset commands based on the library you would like to run:

#### Javascript

```bash
yarn dev:javascript
```

#### React

```bash
yarn dev:react
```

---

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `javascript`: a vanilla js web app
- `react`: a [Next.js](https://nextjs.org) app
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
