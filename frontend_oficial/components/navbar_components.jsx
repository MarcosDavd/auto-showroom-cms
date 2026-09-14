'use client'
import "./navbar.css"
import { useState } from "react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"

export function NavbarAndSidebar({isAuth}){
    const [open,setOpen] = useState(false);
    return <>
            <HorizontalBar onOpen = {() => setOpen(true)} isAuth={isAuth}/>

            <SideBar    open = {open} 
                        onClose = {() => setOpen(false)} isAuth={isAuth}/>
            </>
}


function NavigationLinks({isAuth}){
    return  <ul>
                <li>
                    {isAuth &&(
                        <Link href="/administration/crear-auto">
                            CREAR AUTO TEMP
                        </Link>
                    )}
                    
                </li>
                <li>
                    <Link href="/carPage">
                        NUESTRO AUTOS
                    </Link>
                </li>
                <li>
                    {isAuth ? <LogoutButton text="CERRAR SESIÓN"/>
                            : 
                    <Link href="/contactPage">
                        CONTACTO
                    </Link>}
                    
                </li>
            </ul>
}

function HorizontalBar({onOpen,isAuth}){
    return  <nav className='navbar'>
                <TitleNav/>
                <NavigationLinks isAuth={isAuth}/>
                <button className="open-sidebar-button" onClick={onOpen}><svg className="burger-button-style" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
            </nav>
}
function SideBar({open,onClose ,isAuth}){
    return  <nav className={open ? "sidebar open":"sidebar"}>
                <button className="close-sidebar-button"  onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                <NavigationLinks isAuth={isAuth}/>
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