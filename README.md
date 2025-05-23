# Express.js API with Nginx Load Balancer

## Overview

This project demonstrates how to scale an Express.js backend API using Docker containers and Nginx as a load balancer. The setup spins up multiple Docker containers running the same Express.js API and uses Nginx to distribute incoming requests across these containers using round-robin load balancing.

Nginx serves as a reverse proxy server that provides load balancing, caching, and security features (SSL termination, request redirection). The round-robin algorithm (Nginx's default) distributes client requests sequentially across all available backend containers in a cyclical manner.

## Objectives

**Primary Goal:** Implement load balancing using Nginx to distribute traffic across multiple Express.js API containers

**Secondary Goals:** 
- Practice using Docker Compose with YAML configuration
- Gain deeper understanding of Docker commands, containers, and volumes
- Explore container orchestration concepts

## Prerequisites

Before running this project, ensure you have:

- **Node.js** installed on your local machine
- **PostgreSQL Database** (I used Neon PostgreSQL with a pre-created database and table)
- **Docker and Docker Compose** installed
- **Basic knowledge** of Express.js and Docker
- **Linux environment** (any Linux distribution will work)

## Backend API Dependencies

The Express.js API uses the following key dependencies:

- **Express.js** - Web framework for creating the API
- **Express Validator** - Middleware for request data validation
- **TS-Node-Dev** - TypeScript development server with auto-restart (you can substitute with nodemon if preferred)
- **PG** - PostgreSQL client library for Node.js
- **Dotenv** - Environment variable management

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/noruwa03/express-js-nginx-lb
   ```

2. **Navigate to the project directory:**
   ```bash
   cd express-js-nginx-lb/app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file with the following variables:
   - `PORT` - Port number for the Express.js server
   - `DB_CONN_LINK` - PostgreSQL connection string from Neon DB

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
express-js-nginx-lb/
├── app/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── create-post.ts
│   │   │   ├── delete-post.ts
│   │   │   ├── get-post-by-id.ts
│   │   │   ├── get-posts.ts
│   │   │   └── update-post.ts
│   │   ├── db/
│   │   │   ├── express-test-db.sql
│   │   │   └── index.ts
│   │   ├── middlewares/
│   │   │   └── post-validation.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   └── app.ts
│   ├── .dockerignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── nginx/
│   └── nginx.conf
├── compose.yml
└── README.md
```

## Challenges and Solutions

### Securing Environment Variables

**Challenge:** I wanted to securely handle the `.env` file using `env_file` or `secrets` in the Docker Compose configuration. However, when running `docker compose -f compose.yml config`, I encountered persistent errors. I didn't want to copy the `.env` file directly into the Docker container, so I added it to `.dockerignore`.

**Solution:** I used Docker volumes to map the `app/.env` file to the `/etc/express_env/.env` directory inside the container. This approach keeps sensitive data out of the container image while still making it accessible at runtime.

**Key Takeaway:** Through research, I discovered that even when using `env_file`, `environment`, or `secrets` in Docker Compose, sensitive data isn't pushed to artifact registries like Docker Hub - these values are only injected during container initialization. I also gained valuable insights into how Docker volumes enable live configuration updates from the development environment to the server without requiring SSH access and manual file editing.

## Recommendations for Future Improvements

1. **Monitoring and Observability:** Implement comprehensive monitoring for the backend API including metrics collection, centralized logging, and distributed tracing

2. **CI/CD Pipeline:** Deploy to cloud infrastructure using automated CI/CD pipelines with GitHub Actions

3. **Security Enhancements:** Add SSL/TLS termination at the Nginx layer to secure API communications
