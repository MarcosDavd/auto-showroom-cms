
import "./global.css"
import { Navbar } from "@/components/navbar_components"
import { CarContact } from "./little_global_comps"
import { GoogleMap } from "@/components/google_map_comp"
export default function RootLayout({children}){
    return <html>
                <head>
                    <meta charSet="UTF-8"/>
                    <meta name="robots" content="index, follow"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>  
                    <meta name="author" content="DavSeis"/>
                    <meta name="description" content="Aqui encontraras el auto que estas buscando al mas accesible"/>
                    <meta name="keywords" content="auto, carro, concesionaria, vehiculo, modelo"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                    <link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap" rel="stylesheet"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                    <title>my app</title>
                </head>  
                <body>
                    <Navbar/>
                    {children}

                   <CarContact/> 
                    <footer>   
                       
                    </footer>
                </body>
            </html>
}