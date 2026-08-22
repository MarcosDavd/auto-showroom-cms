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