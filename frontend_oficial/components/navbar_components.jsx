'use client'
import "./navbar.css"
import { useEffect, useState } from "react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"

export function NavbarAndSidebar({isAuth}){
    const [open,setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;

        function closeOnEscape(event) {
            if (event.key === "Escape") setOpen(false);
        }

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [open]);

    return <>
            <HorizontalBar onOpen={() => setOpen(true)} isAuth={isAuth} isOpen={open}/>
            {open && <button
                className="sidebar-backdrop"
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
            />}
            <SideBar
                open={open}
                onClose={() => setOpen(false)}
                isAuth={isAuth}
            />
            </>
}


function NavigationLinks({isAuth, onNavigate}){
    return  <ul>
                <li>
                    {isAuth &&(
                        <Link href="/administration/crear-auto" onClick={onNavigate}>
                            CREAR AUTO TEMP
                        </Link>
                    )}
                    
                </li>
                <li>
                    <Link href="/carPage" onClick={onNavigate}>
                        NUESTRO AUTOS
                    </Link>
                </li>
                <li>
                    {isAuth ? <LogoutButton text="CERRAR SESIÓN"/>
                            : 
                    <Link href="/contactPage" onClick={onNavigate}>
                        CONTACTO
                    </Link>}
                    
                </li>
            </ul>
}

function HorizontalBar({onOpen,isAuth,isOpen}){
    return  <nav className='navbar'>
                <TitleNav/>
                <NavigationLinks isAuth={isAuth}/>
                <button
                    className="open-sidebar-button"
                    type="button"
                    onClick={onOpen}
                    aria-label="Abrir menú"
                    aria-expanded={isOpen}
                    aria-controls="mobile-sidebar"
                >
                    <svg className="burger-button-style" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" aria-hidden="true"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                </button>
            </nav>
}
function SideBar({open,onClose ,isAuth}){
    return  <nav id="mobile-sidebar" aria-label="Menú móvil" className={open ? "sidebar open":"sidebar"}>
                <button className="close-sidebar-button" type="button" aria-label="Cerrar menú" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                <NavigationLinks isAuth={isAuth} onNavigate={onClose}/>
            </nav>
}


function TitleNav(){
    return  <Link href="/">
                <h1> 
                    <span className="title-concesionaria">C</span>
                    <span className="title-concesionaria">o</span>
                    <span className="title-concesionaria">n</span>
                    <span className="title-concesionaria">c</span>
                    <span className="title-concesionaria">e</span>
                    <span className="title-concesionaria">c</span>
                    <span className="title-concesionaria">i</span>
                    <span className="title-concesionaria">o</span>
                    <span className="title-concesionaria">n</span>
                    <span className="title-concesionaria">a</span>
                    <span className="title-concesionaria">r</span>
                    <span className="title-concesionaria">i</span>
                    <span className="title-concesionaria">a</span>
                </h1>
            </Link>
                
}