import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';
import { prisma } from '@/lib/prisma';
import './administration.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default async function AdministrationPage({ searchParams }) {
  const params = await searchParams;
  const period = params?.period === 'month' ? 'month' : 'week';
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    redirect('/login-administration');
  }

  let payload;
  try {
    const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
    ({ payload } = await jwtVerify(accessToken, accessSecret));
  } catch {
    redirect('/login-administration');
  }

  const dateRange = new Date();
  dateRange.setDate(dateRange.getDate() - (period === 'month' ? 30 : 7));

  const [autos, totalAutos, totalMarcas, totalModelos, topMarcas, topModelos, mostVisited] = await Promise.all([
      prisma.auto.findMany({
        orderBy: { creadoEn: 'desc' },
        take: 6,
        select: {
          id: true,
          marca: true,
          modelo: true,
          anio: true,
          precio: true,
          estado: true,
          creadoEn: true,
          kilometraje: true,
          urlImagen: true,
        },
      }),
      prisma.auto.count(),
      prisma.marca.count(),
      prisma.modelo.count(),
      prisma.busquedaFiltro.groupBy({
        by: ['marca'],
        where: { fecha: { gte: dateRange }, marca: { not: null } },
        _count: { marca: true },
        orderBy: { _count: { marca: 'desc' } },
        take: 5,
      }).then((rows) => rows.map((row) => ({
        marca: row.marca,
        count: row._count.marca,
      }))),
      prisma.busquedaFiltro.groupBy({
        by: ['modelo'],
        where: { fecha: { gte: dateRange }, modelo: { not: null } },
        _count: { modelo: true },
        orderBy: { _count: { modelo: 'desc' } },
        take: 5,
      }).then((rows) => rows.map((row) => ({
        modelo: row.modelo,
        count: row._count.modelo,
      }))),
      prisma.auto.findMany({
        where: { visitas: { gt: 0 } },
        orderBy: { visitas: 'desc' },
        take: 5,
        select: {
          id: true,
          marca: true,
          modelo: true,
          visitas: true,
          urlImagen: true,
        },
      }),
  ]);

  const email = typeof payload.email === 'string' ? payload.email : 'Administrador';

  return (
      <main className='admin-dashboard'>
        <header className='admin-topbar'>
          <div>
            <h1>Panel de administracion</h1>
          </div>
        </header>

        <section className='admin-kpis'>
          <article className='admin-kpi'>
            <span>Total de autos</span>
            <strong>{totalAutos}</strong>
          </article>
          <article className='admin-kpi'>
            <span>Marcas</span>
            <strong>{totalMarcas}</strong>
          </article>
          <article className='admin-kpi'>
            <span>Modelos</span>
            <strong>{totalModelos}</strong>
          </article>
          <article className='admin-kpi'>
            <span>Recientes</span>
            <strong>{autos.length}</strong>
          </article>
        </section>

        <section className='admin-actions'>
          <Link href='/administration/crear-auto' className='admin-action-card'>
            <span>Crear auto</span>
            <strong>Agregar nuevo vehículo</strong>
          </Link>
          <Link href='/administration/marcas-modelos' className='admin-action-card'>
            <span>Marcas y modelos</span>
            <strong>Gestionar catálogo</strong>
          </Link>
        </section>

        <section className='admin-trends'>
          <div className='admin-trends-header'>
            <div>
              <p className='admin-table-kicker'>Análisis</p>
              <h2>Tendencias</h2>
            </div>

            <div className='admin-period-switch'>
              <Link href='/administration?period=week' className={period === 'week' ? 'is-active' : ''}>Última semana</Link>
              <Link href='/administration?period=month' className={period === 'month' ? 'is-active' : ''}>Último mes</Link>
            </div>
          </div>

          <div className='admin-trends-grid'>
            <article className='admin-trend-panel'>
              <h3>Top 5 marcas</h3>
              <ul>
                {topMarcas.length === 0 ? (
                  <li>No hay datos para este período.</li>
                ) : (
                  topMarcas.map((item, index) => (
                    <li key={`${item.marca}-${index}`}>
                      <span>{index + 1}. {item.marca}</span>
                      <strong>{item.count}</strong>
                    </li>
                  ))
                )}
              </ul>
            </article>

            <article className='admin-trend-panel'>
              <h3>Top 5 modelos</h3>
              <ul>
                {topModelos.length === 0 ? (
                  <li>No hay datos para este período.</li>
                ) : (
                  topModelos.map((item, index) => (
                    <li key={`${item.modelo}-${index}`}>
                      <span>{index + 1}. {item.modelo}</span>
                      <strong>{item.count}</strong>
                    </li>
                  ))
                )}
              </ul>
            </article>

            <article className='admin-trend-panel admin-trend-panel-wide'>
              <h3>Autos más visitados</h3>
              <ul>
                {mostVisited.length === 0 ? (
                  <li>Aún no hay visitas registradas.</li>
                ) : (
                  mostVisited.map((item, index) => (
                    <li key={item.id}>
                      <span>{index + 1}. {item.marca} {item.modelo}</span>
                      <strong>{item.visitas} visitas</strong>
                    </li>
                  ))
                )}
              </ul>
            </article>
          </div>
        </section>

        <section className='admin-table-card'>
          <div className='admin-table-header'>
            <div>
              <h2>Autos recientes</h2>
            </div>
            <Link href='/carPage' className='admin-link-secondary'>Ver catálogo</Link>
          </div>

          {autos.length === 0 ? (
            <p className='admin-empty'>Todavía no hay autos cargados.</p>
          ) : (
            <div className='admin-table-wrap'>
              <table>
                <thead>
                  <tr>
                    <th>Vehículo</th>
                    <th>Año</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {autos.map((auto) => (
                    <tr key={auto.id}>
                      <td>
                        <Link href={`/auto-detalle?id=${auto.id}`} className='admin-vehicle-name'>
                          <span className='admin-thumb'>
                            <img
                              src={auto.urlImagen?.[0] || '/images/placeholder-car.jpg'}
                              alt={`${auto.marca} ${auto.modelo}`}
                            />
                          </span>
                          <span>{auto.marca} {auto.modelo}</span>
                        </Link>
                      </td>
                      <td>{auto.anio}</td>
                      <td>{formatCurrency(auto.precio)}</td>
                      <td>{auto.estado === 'OKM' ? '0 KM' : 'Usado'}</td>
                      <td>{new Date(auto.creadoEn).toLocaleDateString('es-AR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
  );
}


