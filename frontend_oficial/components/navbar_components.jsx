'use client'
import "./navbar.css"
import { useState } from "react"
import Link from "next/link"

function NavigationLinks(){
    return  <ul>
                <li>
                    <Link href="/administration/crear-auto">
                        CREAR AUTO TEMP
                    </Link>
                </li>
                <li>
                    <Link href="/carPage">
                        NUESTRO AUTOS
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        CONTACTO
                    </Link>
                </li>
            </ul>
}

function HorizontalBar({onOpen}){
    return  <nav className='navbar'>
                <TitleNav/>
                <NavigationLinks/>
                <button className="open-sidebar-button" onClick={onOpen}><svg className="burger-button-style" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></button>
            </nav>
}
function SideBar({open,onClose}){
    return  <nav className={open ? "sidebar open":"sidebar"}>
                <button className="close-sidebar-button"  onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
                <NavigationLinks/>
            </nav>
}

export function Navbar(){
    const [open,setOpen] = useState(false);
    return <>
            <HorizontalBar onOpen = {() => setOpen(true)}/>

            <SideBar    open = {open} 
                        onClose = {() => setOpen(false)}/>
            </>
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