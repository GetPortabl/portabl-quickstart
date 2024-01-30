# Portabl Quickstart

Welcome to the Portabl Quickstart repository! This repository serves as a companion to Portabl's quickstart guides for verifying, issuing, and authenticating. Here, you will find practical examples that demonstrate how to integrate the Connect SDK to authorize users as well as apis to issue and authenticate them.

---

## Setup

### Setting up Environment Variables

To get started, create a `.env` file from the provided `.env.example` template and fill in the necessary environment variables for your integration.

```bash
cp .env.example .env
```

---

## Running the Project

You have two options for running the quickstart example: with Docker or without it.

### Running with Docker

This repository is configured to be built and run using Docker and Docker Compose.

#### Make Commands:

- `up`: Builds and starts the container.
- `logs`: Tails logs from the container.
- `stop`: Stops the running container.

### Running without Docker

If you prefer not to use Docker, follow the steps below:

1. Install dependencies:

   ```bash
   yarn
   ```

2. Run both the frontend and "api" sample projects in development mode. Choose one of the preset commands based on the integration and library you want to run:

   #### Portabl NextJs Quickstart

   ```bash
   yarn dev:portabl-next:
   ```

---

## What's Inside?

This project utilizes turborepo and [Yarn](https://classic.yarnpkg.com/lang/en/) as the package manager. It includes the following apps:

### Apps

- `portabl-next`: A [Next.js](https://nextjs.org) app that demonstrates verifying, authenticating, and issuing.
