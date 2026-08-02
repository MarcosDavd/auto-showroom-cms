import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const autos = [
    {
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2022,
      kilometraje: 18000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'ABC123',
      precio: 18500000,
      descripcion: 'Auto cómodo y eficiente',
    },
    {
      marca: 'Honda',
      modelo: 'Civic',
      anio: 2021,
      kilometraje: 24000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'XYZ789',
      precio: 16990000,
      descripcion: 'Diseño moderno y muy confiable',
    },
    {
      marca: 'Mazda',
      modelo: 'CX-5',
      anio: 2020,
      kilometraje: 32000,
      urlImagen: ['/images/carroCarrusel1.avif'],
      patente: 'QWE456',
      precio: 20950000,
      descripcion: 'SUV ideal para la ciudad y ruta',
    },
  ];

  for (const auto of autos) {
    await prisma.auto.create({ data: auto });
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
