import { prisma } from '@/lib/prisma';
import MarcasModelosForms from './MarcasModelosForms';
import './marcas-modelos.css';
import { BackButton } from '@/components/back_button';

export default async function MarcasModelosPage() {
    const marcas = await prisma.marca.findMany({
        orderBy: { nombre: 'asc' },
    });

    return (
        <section className="page-marcas-modelos">
            <MarcasModelosForms initialMarcas={marcas} />
            <BackButton href="/administration" classBack={"volver"} text="← Volver"/>
            <BackButton href="/administration" classBack={"volver-phone"} text="←"/>
        </section>
    );
}
