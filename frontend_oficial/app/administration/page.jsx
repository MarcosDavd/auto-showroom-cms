import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { BackButton } from '@/components/back_button';

export default async function AdministrationPage() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
    const { payload } = await jwtVerify(accessToken, accessSecret);

    return (
        <>
            <p>HOLA {payload.email}</p>
            <BackButton href="/" />
            <Link href="/administration/marcas-modelos">Agregar marca o modelo</Link>
            <LogoutButton />
        </>
    );
}
