import { prisma } from '@/lib/prisma';
import MarcasModelosForms from './MarcasModelosForms';
import './marcas-modelos.css';

export default async function MarcasModelosPage() {
    const marcas = await prisma.marca.findMany({
        orderBy: { nombre: 'asc' },
    });

    return (
        <section className="page-marcas-modelos">
            <MarcasModelosForms initialMarcas={marcas} />
        </section>
    );
}
