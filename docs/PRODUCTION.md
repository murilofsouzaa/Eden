# Deploy em produção

Este projeto usa uma arquitetura simples e robusta para ambiente real, com separação entre serviços de aplicação e servidor web reverso.

## Visão geral da infraestrutura

- **Banco de dados:** PostgreSQL em container
- **Backend:** Spring Boot em container
- **Frontend:** Build estático do React servido por NGINX
- **Servidor em produção:** NGINX externo atuando como proxy reverso
- **Deploy:** Automatizado por GitHub Actions para VPS

## Fluxo de produção

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

## Configuração do NGINX (Host)

Exemplo de estrutura base do Proxy Reverso no servidor:

```nginx
server {
    listen 80;
    server_name seu-dominio.com.br;

    location / {
        proxy_pass [http://127.0.0.1:3000](http://127.0.0.1:3000);
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}