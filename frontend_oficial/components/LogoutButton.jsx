"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } finally {
            router.refresh()
            router.push("/login-administration");
        }
    }

    return (
        <button onClick={handleLogout} disabled={loading}>
            {loading ? "Cerrando..." : "CERRAR SESIÓN"}
        </button>
    );
}
