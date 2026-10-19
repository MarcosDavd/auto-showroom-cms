import { prisma } from '@/lib/prisma';
import AutoDetailGallery from './AutoDetailGallery';
import { BackButton } from '@/components/back_button';
import './auto-detalle.css';

export const dynamic = 'force-dynamic';

export default async function AutoDetallePage({ searchParams }) {
  const params = await searchParams;
  const id = Number(params?.id);

  if (!Number.isInteger(id) || id <= 0) {
    return (
      <main className="auto-detail-page auto-detail-empty">
        <p className="detail-kicker">CATALOGO</p>
        <h1>Auto no encontrado</h1>
        <p>El vehículo que buscas ya no está disponible o el enlace no es válido.</p>
        <BackButton href="/carPage" />
      </main>
    );
  }

  const auto = await prisma.auto.findUnique({ where: { id } });

  if (!auto) {
    return (
      <main className="auto-detail-page auto-detail-empty">
        <p className="detail-kicker">CATALOGO</p>
        <h1>Auto no encontrado</h1>
        <p>El vehículo que buscas ya no está disponible o el enlace no es válido.</p>
        <BackButton href="/carPage" />
      </main>
    );
  }

  const autoActualizado = await prisma.auto.update({
    where: { id },
    data: { visitas: { increment: 1 } },
  });

  return (
    <main className="auto-detail-page">
      <BackButton href="/carPage" />
      <AutoDetailGallery images={autoActualizado.urlImagen} name={`${autoActualizado.marca} ${autoActualizado.modelo}`} />

      <section className="auto-detail-info" aria-labelledby="auto-detail-title">
        <div className="detail-heading">
          <p className="detail-kicker">{autoActualizado.estado === 'OKM' ? '0 KM' : 'SEMINUEVO'} · {autoActualizado.anio}</p>
          <h1 id="auto-detail-title">{autoActualizado.marca} <span>{autoActualizado.modelo}</span></h1>
        </div>
        <p className="detail-price">${new Intl.NumberFormat('es-AR').format(autoActualizado.precio)}</p>

        <dl className="detail-specs">
          <div><dt>Marca</dt><dd>{autoActualizado.marca}</dd></div>
          <div><dt>Modelo</dt><dd>{autoActualizado.modelo}</dd></div>
          <div><dt>Kilómetros</dt><dd>{new Intl.NumberFormat('es-AR').format(autoActualizado.kilometraje)} km</dd></div>
          <div><dt>Año</dt><dd>{autoActualizado.anio}</dd></div>
        </dl>

        <div className="detail-description">
          <p className="detail-kicker">DETALLES DEL VEHÍCULO</p>
          <p>{autoActualizado.descripcion || 'Consultá por este vehículo para conocer todos sus detalles y condiciones.'}</p>
        </div>
      </section>
    </main>
  );
}