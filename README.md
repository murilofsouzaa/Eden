<p align="center">
  <img width="627" height="203" src="https://github.com/user-attachments/assets/8adca521-9ff3-4985-885c-bfa2f844d30f" />
</p>

# Eden

The Eden project is an **online shop focused on gym clothing**. The goal is to give users a fast and simple way to browse items and check details. The interface stays clear, the product list stays organized, and the system connects the frontend and backend to keep everything stable and safe.

**It works like a good workout plan: steady, clear, and built to help you move forward.**

I'm developing this project to learn concepts such as: Domain-Driven Design, Design Patterns, SOLID, Mobile First, and UI/UX.

**Prototype:** https://www.figma.com/proto/bh5TuhdBSesmUsegzCpEdg/EDEN?node-id=0-1&t=08d9XmtUwl2qmwZK-1

## Technologies

**Backend:** Java, Spring Boot

**Frontend:** React, TypeScript, TailwindCSS

**Database:** PostgreSQL

**Build**: Maven (backend), Vite + TypeScript (frontend)

**Infra**: Docker

**Architecture: Layers**

## Dependencies

### Backend (Maven)
- `org.springframework.boot:spring-boot-starter-data-jpa`
- `org.springframework.boot:spring-boot-starter-web`
- `org.springframework.boot:spring-boot-starter-validation`
- `org.postgresql:postgresql` (runtime)
- `com.h2database:h2` (runtime)
- `org.springframework.boot:spring-boot-starter-test` (test)
- `junit:junit` (test)
- `org.mockito:mockito-core` (test)

### Frontend (npm)
**Dependencies**
- `axios`
- `lucide-react`
- `react-router`
- `react-feather`

**Dev Dependencies**
- `@eslint/js`
- `@tailwindcss/vite`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `@vitejs/plugin-react`
- `eslint`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `tailwindcss`
- `typescript`
- `typescript-eslint`
- `vite`

## Getting started

### Clone the repository

```bash
git clone https://github.com/murilofsouzaa/Eden.git
```

### Running Backend (Spring Boot)
```bash
cd eden/backend/eden
mvn install
./mvnw spring-boot:run
```
### Running Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

This project uses a simple and robust architecture for real environments, featuring a clear separation between application services and a reverse proxy web server.

### Infrastructure Overview

- **Database:** PostgreSQL running in a container
- **Backend:** Spring Boot running in a container
- **Frontend:** Static React build served by NGINX
- **Production Server:** Host-level NGINX acting as a reverse proxy
- **Deployment:** Automated via GitHub Actions to a VPS

### Production Workflow

The production execution flow operates as follows:

1. The backend is accessible internally on port `8080`.
2. The frontend is compiled into a static build and served by NGINX inside the container on port `8080`.
3. The host's NGINX (VPS server) receives secure traffic on ports `80` and `443` (HTTPS).
4. The host's NGINX forwards frontend requests to `127.0.0.1:3000`.
5. The frontend consumes the backend API through `/api` routes.

This model separates the web application from the ingress server, enabling:
- Better management of SSL/TLS certificates
- HTTP caching and compression
- Centralized routing
- Higher isolation and stability

### NGINX Configuration (Host)

Example base structure for the Reverse Proxy on the server:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Frontend Container with NGINX

The frontend container uses the unprivileged official NGINX image:

```dockerfile
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

This means the web interface is served statically and efficiently in production without relying on an active Node process in the target environment.

### Backend in Production

The backend is packaged into a Java image with JRE and exposes port `8080`:

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/eden-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar /app/app.jar"]
```

This model is suited for a real server environment, spinning up the Java application directly in a lightweight and stable JVM.

### Automated Deployment to VPS

The deployment pipeline uses GitHub Actions to connect via SSH to the VPS, pull the latest code, and spin up the containers:

```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Execute Deploy via SSH on VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT }}
          script: |
            cd ~/projects/eden
            git pull origin main
            docker compose down
            docker compose up -d --build
            docker system prune -f
```

This strategy enables automated publishing of new versions while keeping the application running on a live server.

### Important Notes

- The local environment can be run using `docker compose` for development and testing.
- The live production environment requires a server with open `80`/`443` ports and a domain pointing to the VPS.
- It is recommended to configure SSL using Let's Encrypt or another provider to ensure HTTPS.
- The external NGINX must remain responsible for ingress routing, while containers remain internal with ports mapped only as needed.

### Summary

The Eden production setup consists of:

- PostgreSQL for persistence
- Spring Boot for the API
- React compiled into static files
- NGINX serving the frontend
- Host-level NGINX acting as a reverse proxy on a real VPS
- Automated deployment via GitHub Actions

This architecture provides a reliable, stable, and production-ready foundation for a real web application.

## CI/CD with GitHub Actions

This repository uses GitHub Actions for continuous integration (CI) and continuous deployment (CD). The typical setup includes separate workflows for:

- CI (build & test) for backend and frontend on pull requests and pushes.
- CD (deploy) to the VPS on pushes to the main branch (already present in this file above).

Suggested CI workflow examples (create under `.github/workflows/`):

1) Backend CI - `.github/workflows/ci-backend.yml`

```yaml
name: CI - Backend

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - name: Build and test
        run: |
          cd backend/eden
          mvn -B -DskipTests=false clean test

      - name: Package
        if: success()
        run: |
          cd backend/eden
          mvn -B -DskipTests=true package
```

2) Frontend CI - `.github/workflows/ci-frontend.yml`

```yaml
name: CI - Frontend

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Run tests
        run: |
          cd frontend
          npm run test -- --watchAll=false
      - name: Build
        run: |
          cd frontend
          npm run build
```

Notes and best practices
- Store sensitive values and deployment credentials in GitHub Secrets (for example: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT`).
- Use protected branches (e.g., `main`) and require that CI checks pass before merging.
- Add status badges to the `README.md` once workflows are created to show build status. Example badge URL:

  - Backend CI badge:
    `https://github.com/<owner>/<repo>/actions/workflows/ci-backend.yml/badge.svg`
  - Frontend CI badge:
    `https://github.com/<owner>/<repo>/actions/workflows/ci-frontend.yml/badge.svg`

- For deployment, the existing `Deploy to VPS` workflow connects via SSH; ensure the SSH key in `VPS_SSH_KEY` has the correct permissions and the VPS user can run `docker compose`.

If you want, I can add the workflow files under `.github/workflows/` and create status badges in this README — tell me if you want me to create those files now.
