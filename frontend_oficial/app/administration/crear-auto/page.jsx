import { prisma } from '@/lib/prisma';
import CrearAutoForm from './CrearAutoForm';
import './crear-auto.css';

export default async function CrearAutoPage() {
  const [marcas, modelos] = await Promise.all([
    prisma.marca.findMany({ orderBy: { nombre: 'asc' } }),
    prisma.modelo.findMany({ orderBy: { nombre: 'asc' } }),
  ]);

  return (
    <section className="page-crear-auto">
      <CrearAutoForm marcas={marcas} modelos={modelos} />
    </section>
  );
}
