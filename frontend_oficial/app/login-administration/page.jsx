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
    const [showPassword, setShowPassword] = useState(false);

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
            <h2>Iniciar sesión</h2>
            <div className="login-field">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" name="email" autoComplete="email" required />
            </div>
            <div className="login-field">
                <label htmlFor="password">CONTRASEÑA</label>
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((visible) => !visible)}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
            </div>
            {errorMsg && <p className="login-error" role="alert">{errorMsg}</p>}
            <button className="login-submit" type="submit" disabled={loading}>
                {loading ? "ENTRANDO..." : "ENTRAR"}
            </button>
        </form>
    );
}

function EyeIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
}

function EyeOffIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 3 18 18M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a17.5 17.5 0 0 1-3.1 3.7M6.2 6.4C3.7 8.2 2 12 2 12s3.5 6 10 6c1.4 0 2.6-.3 3.7-.8M9.9 9.9a3 3 0 0 0 4.2 4.2" /></svg>;
}
