# Sync with Portabl Quickstart

This repository accompanies [Portabl's quickstart guide for Sync with Portabl](https://docs.getportabl.com/quickstart) and shows an example of integrating the SDKs required for issuing credentials for your users.

Here you will find necessary steps and samples to get the app running on your machine utilizing our [APIs](https://docs.getportabl.com/api-ref) and our [Client Side SDKs](https://docs.getportabl.com/tutorials/data-sync#4-data-sync-widget-integration-steps).

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
make up lib=javascript
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

This project is built with turborepo and [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following apps:

### Apps

- `javascript`: a vanilla js web app
- `react`: a [Next.js](https://nextjs.org) app
- `api`: an [Express](https://expressjs.com/) server
