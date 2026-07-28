'use client'
import { useRef,useEffect, useState } from "react";
import "./car_target_carrousel.css"

function CarTargetComp({brand,model,year,price,urlImage}){
    return  <div className="car-target">
                <div>
                    <img    src={urlImage}
                            alt="carro-ejemplo" />
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                </div>
                
                <h2>{brand} {model}</h2>
                <p>{year}</p>
                <p>{price}</p>
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
                    <button className="button-car-carrousel" onClick={previous}>←</button>
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
                     <button className="button-car-carrousel" onClick={next}>→</button>
                </div> 
                

           
        </>
    );
}