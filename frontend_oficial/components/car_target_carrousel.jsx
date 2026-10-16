'use client'
import { useRef,useEffect, useState } from "react";
import Link from "next/link";
import "./car_target_carrousel.css"
import { Loader } from "./loader";

export function TargetsCarrouselComp(){
    const [carTargetData, setCarTargetData] = useState([]);
    const [load,setLoad] = useState (false);
    useEffect(() => {
        async function loadFetch() {
            try{
                setLoad(true);
                const data = await getFetchData('/api/autos/obtenerAutos');
                setCarTargetData(data.data || []);
            }catch(error){
                console.log("error en el fetch obtener autos ",error);
            }finally{
                setLoad(false);
            }        
        }
        loadFetch();
    }, []);
    

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
                    <button className="button-car-carrousel" onClick={previous}><svg className="button-prevnext" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#fefefe"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></button>    
                    <div className="targets-carrousel" ref={carouselRef}>
                        {load ? (
                            <Loader/>
                        ): (carTargetData.map((carInfo) =>(
                            <CarTargetComp 
                                        key={carInfo.id}
                                        id={carInfo.id}
                                        brand ={carInfo.marca}
                                        model={carInfo.modelo}
                                        year={carInfo.anio}
                                        price={carInfo.precio}
                                        urlImage={carInfo.urlImagen[0]}

                                         />
                        )))}
                        
                    
                    </div>
                     <button className="button-car-carrousel" onClick={next}><svg className="button-prevnext" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#ffffff"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></button>
                </div> 
                

           
        </>
    );
}


 export function CarTargetComp({id,brand,model,year,price,urlImage}){
    return  <Link href={`/auto-detalle?id=${id}`} className="car-target">
      {/* Detalle visual: Línea dorada superior */}
      <span className="card-top-line"></span>
      
      <div className="card-image-wrapper">
        <img src={urlImage} alt={`${brand} ${model}`} />
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h2>{brand} <span className="model-text">{model}</span></h2>
          <p className="year-text">Año: {year}</p>
        </div>
        
        <div className="card-details">
          <p className="price-label">Costo</p>
          <p className="price-value">${price}</p>
        </div>

        {/* Detalle visual: Icono verificado y precio final */}
        <div className="card-footer">
        </div>
      </div>
    </Link>
}




{/* <Link href={`/auto-detalle?id=${id}`} className="car-target">
                <img    src={urlImage}
                        alt={`${brand} ${model}`} />
                <div>
                    <h2>{brand} - {model}</h2>
                    <p>Año: {year}</p>
                    <p>Costo: ${price}</p>
                </div>
            </Link> */}




async function getFetchData(url){
    
    const rest = await fetch(url);
    const data = await rest.json();
    return data;
}
