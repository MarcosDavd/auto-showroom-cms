import { NavbarAndSidebar } from "./navbar_components";
// lib/auth.js

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

async function getSession() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const accessSecret = new TextEncoder().encode(
            process.env.JWT_ACCESS_SECRET
        );

        const { payload } = await jwtVerify(
            accessToken,
            accessSecret
        );

        return payload;

    } catch (error) {
        return null;
    }
}
export async function Navbar(){
    const session = await getSession()
    const isAuth = session != null
    return <NavbarAndSidebar isAuth ={isAuth}/>
}