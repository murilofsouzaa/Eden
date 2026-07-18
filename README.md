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
