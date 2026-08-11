<p align="center">
  <img width="627" height="203" src="https://github.com/user-attachments/assets/8adca521-9ff3-4985-885c-bfa2f844d30f" />
</p>

# Eden

The Eden project is an **online shop focused on gym clothing**. The goal is to give users a fast and simple way to browse items and check details. The interface stays clear, the product list stays organised, and the system connects the frontend and backend to keep everything stable and safe.

**It works like a good workout plan: steady, clear, and built to help you move forward.**

I'm developing this project to learn concepts such as: Domain Drive Desing, Design Patterns, SOLID, Mobile First and UI/UX.

**Prototype:** https://www.figma.com/proto/bh5TuhdBSesmUsegzCpEdg/EDEN?node-id=0-1&t=08d9XmtUwl2qmwZK-1

## Technologies

**Backend:** Java, Spring Boot

**Frontend:** React, Typescript, TailwindCSS

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

```
git clone https://github.com/murilofsouzaa/Eden.git
```

### Running Backend (Spring Boot)
```
cd eden/backend/eden
mvn install
./mvnw spring-boot:run
```
### Running Frontend (React)
```
cd frontend
npm install
npm run dev
```

## Deploy em produção

Este projeto usa uma arquitetura simples e robusta para ambiente real, com separação entre serviços de aplicação e servidor web reverso.

### Visão geral da infraestrutura

- **Banco de dados:** PostgreSQL em container
- **Backend:** Spring Boot em container
- **Frontend:** Build estático do React servido por NGINX
- **Servidor em produção:** NGINX externo atuando como proxy reverso
- **Deploy:** Automatizado por GitHub Actions para VPS

### Fluxo de produção

O fluxo de execução em produção consiste em:

1. O backend fica acessível internamente na porta `8080`.
2. O frontend é compilado em build estático e servido por NGINX dentro do container na porta `8080`.
3. O NGINX do host (servidor da VPS) recebe tráfego seguro nas portas `80` e `443` (HTTPS).
4. O NGINX do host encaminha as requisições do frontend para `127.0.0.1:3000`.
5. O frontend consome a API do backend através das rotas `/api`.

Esse modelo separa a aplicação web do servidor de entrada, permitindo:
- Melhor gestão de certificados SSL/TLS
- Cache e compressão HTTP
- Roteamento centralizado
- Maior isolamento e estabilidade

### Configuração do NGINX (Host)

Exemplo de estrutura base do Proxy Reverso no servidor:

```nginx
server {
    listen 80;
    server_name seu-dominio.com.br;

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

### Container do frontend com NGINX

O container do frontend usa a imagem oficial do NGINX sem privilégios:

```dockerfile
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
```

Isso significa que a interface web é entregue de forma estática e eficiente em produção, sem depender de um processo Node em execução no ambiente final.

### Backend em produção

O backend é empacotado em uma imagem Java com JRE e expõe a porta `8080`:

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/eden-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar /app/app.jar"]
```

Esse modelo é adequado para um ambiente real de servidor, pois inicia a aplicação Java diretamente em uma JVM leve e estável.

### Deploy automatizado na VPS

A pipeline de deploy usa GitHub Actions para conectar via SSH na VPS, atualizar o código e subir os containers:

```yaml
name: Deploy na VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do Código
        uses: actions/checkout@v4

      - name: Executar Deploy via SSH na VPS
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

Essa estratégia permite publicar novas versões de forma automatizada, mantendo a aplicação em execução em um servidor real.

### Observações importantes

- O ambiente local pode ser levantado com `docker compose` para desenvolvimento e testes.
- O ambiente de produção real exige um servidor com portas `80`/`443` abertas e um domínio apontando para a VPS.
- Recomenda-se configurar SSL com Let's Encrypt ou outro provedor para garantir HTTPS.
- O NGINX externo deve continuar responsável pelo roteamento de entrada, enquanto os containers ficam internos com portas mapeadas somente conforme necessário.

### Resumo

A solução de produção do Eden é composta por:

- PostgreSQL para persistência
- Spring Boot para a API
- React buildado em arquivos estáticos
- NGINX servindo o frontend
- NGINX externo como proxy reverso em uma VPS real
- Deploy automatizado via GitHub Actions

Esse conjunto representa uma arquitetura válida para uma aplicação web real, estável e pronta para uso em produção.
