# Auto Showroom CMS

Guía rápida para iniciar el proyecto, Prisma, migraciones y seed.

## 1. Requisitos
- Node.js 20+
- PostgreSQL corriendo
- Variable `DATABASE_URL` configurada

## 2. Variables de entorno
Crear un archivo `.env` en la raíz con algo como:

```env
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5433/mi_base_de_datos?schema=public"
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Iniciar la aplicación

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## 5. Prisma

### Generar cliente

```bash
npx prisma generate
```

### Crear o aplicar migraciones

```bash
npx prisma migrate dev
```

### Ejecutar seed

```bash
npm run prisma:seed
```

### Ver la base en Prisma Studio

```bash
npm run prisma:studio
```

## 6. Endpoints útiles

- Health check: `http://localhost:3000/api/health`
- Autos: `http://localhost:3000/api/autos/obtenerAutos`

## 7. Flujo recomendado

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```
