"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login-admin.css";
import { SvgCarThree } from "@/components/message_complement_banner";
import { BackButton } from "@/components/back_button";

export default function LoginPage() {
    return (
        <section className="page-administration-login">
            <BackButton href="/" />
            <LoginContainer />
        </section>
    );
}

function LoginContainer() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!data.ok) {
                setErrorMsg(data.message);
                return;
            }

            router.push("/administration");
            router.refresh();
        } catch (error) {
            setErrorMsg("Error de conexión, intentá de nuevo");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="login-container" onSubmit={handleSubmit}>
            <SvgCarThree />
            <h2>Login de administrador</h2>
            <div>
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" name="email" required></input>
            </div>
            <div>
                <label htmlFor="password">CONTRASEÑA</label>
                <input type="password" id="password" name="password" required></input>
            </div>
            {errorMsg && <p className="login-error">{errorMsg}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "ENTRANDO..." : "ENTRAR"}
            </button>
        </form>
    );
}
