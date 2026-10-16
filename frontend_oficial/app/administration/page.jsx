import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { BackButton } from '@/components/back_button';
import "./administration.css"

export default async function AdministrationPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
    const { payload } = await jwtVerify(accessToken, accessSecret);

    return (
        <main className='admin-page-container'>
            <p>Bienvenido {payload.email}</p>
            <section className='three-buttons'>
                <Link className='marca-modelo' href="/administration/marcas-modelos">Agregar marca o modelo</Link>
                <Link className='marca-modelo' href="/administration/crear-auto">Crear auto</Link>
            </section>
            <LogoutButton text="Salir"/>
        </main>
    );
}


