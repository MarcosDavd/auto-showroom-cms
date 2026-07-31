'use client'
import { useRef,useEffect, useState } from "react";
import "./car_target_carrousel.css"

function CarTargetComp({brand,model,year,price,urlImage}){
    return  <div className="car-target">
                <img    src={urlImage}
                        alt="carro-ejemplo" />
                <div>
                    <h2>{brand} - {model}</h2>
                    <p>Año: {year}</p>
                    <p>Costo: ${price}</p>
                </div>
            </div>
}




async function getFetchData(url){
    
    const rest = await fetch(url);
    const data = await rest.json();
    return data;
}

export function TargetsCarrouselComp(){
    const [carTargetData, setCarTargetData] = useState([]);
    useEffect (()=>{
        async function loadFetch(){
            const data = await getFetchData("http://localhost:5000/api/autos/obtenerAutos");        
            setCarTargetData(data.data)
        }
        loadFetch()
    },[])
    

    const carouselRef = useRef(null);

    const next = () => {
        carouselRef.current.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    };

    const previous = () => {
        carouselRef.current.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    };

    return (
        <> 
            
                <div className="targets-container">
                    <button className="button-car-carrousel" onClick={previous}><svg className="button-prevnext" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#ffffff"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>
                    <div className="targets-carrousel" ref={carouselRef}>
                        {carTargetData.map((carInfo) =>(
                            <CarTargetComp 
                                        key={carInfo.id}
                                        brand ={carInfo.marca}
                                        model={carInfo.modelo}
                                        year={carInfo.anio}
                                        price={carInfo.precio}
                                        urlImage={carInfo.urlImagen[0]}

                                         />
                        ))}
                        
                    
                    </div>
                     <button className="button-car-carrousel" onClick={next}><svg className="button-prevnext" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#ffffff"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                </div> 
                

           
        </>
    );
}