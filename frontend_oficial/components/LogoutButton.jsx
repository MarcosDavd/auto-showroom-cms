<<<<<<< HEAD:frontend_oficial/app/administration/LogoutButton.jsx
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
            router.push("/login-administration");
        }
    }

    return (
        <button onClick={handleLogout} disabled={loading}>
            {loading ? "Cerrando..." : "Cerrar sesión"}
        </button>
    );
}
=======
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({text}) {
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
            {loading ? "Cerrando..." : text}
        </button>
    );
}
>>>>>>> origin/feature/carSpaceDetails:frontend_oficial/components/LogoutButton.jsx
