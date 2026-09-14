<<<<<<< HEAD
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
=======
import { prisma } from '@/lib/prisma';
import {CrearAutoClient} from "./crearAutoClient"

export default async function CrearAutoPage() {
  const[marcas,modelos] = await obtenerMarcasModelos();
  
  
  return (
    <CrearAutoClient
      marcas={marcas}
      modelos={modelos}
      
    />
  );
  
}

export async function obtenerMarcasModelos(){
    const [marcas, modelos] = await Promise.all([
    prisma.marca.findMany({
      orderBy: { nombre: 'asc' }
    }),
    prisma.modelo.findMany({
      orderBy: { nombre: 'asc' }
    }),
  ]);
  return [marcas,modelos];
} 
>>>>>>> origin/feature/carSpaceDetails
