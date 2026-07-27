# Auto Showroom CMS

Este proyecto contiene un backend en Express + Prisma + PostgreSQL y un frontend en React + Vite para administrar autos.

## Requisitos

- Node.js 20 o superior
- npm
- Docker Desktop (para PostgreSQL)
- Git

## 1. Clonar y entrar al proyecto

```bash
git clone <url-del-repo>
cd auto-showroom-cms
```

## 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

## 3. Configurar variables de entorno

edita [backend/.env](backend/.env) con tus valores reales.

## 4. Levantar la base de datos con Docker

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Esto levantará PostgreSQL en:

- Host: localhost
- Puerto: 5433
- Usuario: postgres
- Contraseña: postgrespassword
- Base de datos: mi_base_de_datos

## 5. Ejecutar Prisma y migraciones

Dentro de la carpeta backend:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Si ya existen migraciones y solo quieres aplicarlas a una base de datos existente:

```bash
npx prisma migrate deploy
```

## 6. Iniciar el backend

```bash
cd backend
npm run dev
```

El backend quedará disponible en:

- http://localhost:5000/api/health

## 7. Instalar dependencias del frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend quedará disponible en:

- http://localhost:5173

## 8. Estructura de entorno usada

El backend usa estas variables:

- PORT
- DB_HOST
- DB_PORT
- DB_USER
- DB_PASSWORD
- DB_NAME
- DATABASE_URL
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

## 9. Comandos útiles

```bash
# Detener contenedores
docker compose down

# Borrar datos de PostgreSQL
docker compose down -v
```
