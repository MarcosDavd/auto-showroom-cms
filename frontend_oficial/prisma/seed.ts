import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const marcasConModelos = [
    { marca: 'Toyota', modelos: ['Corolla', 'Hilux'] },
    { marca: 'Honda', modelos: ['Civic', 'CR-V'] },
    { marca: 'Mazda', modelos: ['CX-5', 'Mazda3'] },
    { marca: 'Ford', modelos: ['Ranger'] },
    { marca: 'Chevrolet', modelos: ['Onix'] },
  ];

  for (const { marca, modelos } of marcasConModelos) {
    const marcaCreada = await prisma.marca.upsert({
      where: { nombre: marca },
      update: {},
      create: { nombre: marca },
    });

    for (const modelo of modelos) {
      await prisma.modelo.upsert({
        where: { marcaId_nombre: { marcaId: marcaCreada.id, nombre: modelo } },
        update: {},
        create: { nombre: modelo, marcaId: marcaCreada.id },
      });
    }
  }

  const autos = [
    {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2023,
      kilometraje: 8000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED001',
      precio: 22000000,
      estado: 'OKM',
      descripcion: 'Auto cómodo y eficiente',
    },
    {
      marca: 'Toyota',
      modelo: 'Hilux',
      anio: 2019,
      kilometraje: 65000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED002',
      precio: 18500000,
      estado: 'USADO',
      descripcion: 'Pick-up robusta',
    },
    {
      marca: 'Honda',
      modelo: 'Civic',
      anio: 2022,
      kilometraje: 15000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED003',
      precio: 19800000,
      estado: 'OKM',
      descripcion: 'Diseño moderno y muy confiable',
    },
    {
      marca: 'Honda',
      modelo: 'CR-V',
      anio: 2018,
      kilometraje: 72000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED004',
      precio: 15200000,
      estado: 'USADO',
      descripcion: 'SUV familiar',
    },
    {
      marca: 'Mazda',
      modelo: 'CX-5',
      anio: 2021,
      kilometraje: 32000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED005',
      precio: 21000000,
      estado: 'USADO',
      descripcion: 'SUV ideal para la ciudad y ruta',
    },
    {
      marca: 'Mazda',
      modelo: 'Mazda3',
      anio: 2024,
      kilometraje: 3000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED006',
      precio: 23500000,
      estado: 'OKM',
      descripcion: 'Compacto deportivo',
    },
    {
      marca: 'Ford',
      modelo: 'Ranger',
      anio: 2020,
      kilometraje: 48000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED007',
      precio: 26000000,
      estado: 'USADO',
      descripcion: 'Pick-up de trabajo',
    },
    {
      marca: 'Chevrolet',
      modelo: 'Onix',
      anio: 2023,
      kilometraje: 12000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'SEED008',
      precio: 14500000,
      estado: 'OKM',
      descripcion: 'Auto chico y económico',
    },
  ];

  for (const auto of autos) {
    await prisma.auto.upsert({
      where: { patente: auto.patente },
      update: auto,
      create: auto,
    });
  }

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
