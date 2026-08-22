'use client'
import { useEffect,useState } from "react";
import { CarTargetComp } from "@/components/car_target_carrousel";
import "./total-cars.css"

export function CarsSpace({filtros}){  
    const[queryCars,setQueryCars] = useState([]);  
    const[numPages,setNumPages] = useState(1)
    useEffect(()=>{        
        async function mamaVergaAsync(){            
            const data = await functionQueryCars(filtros)
            setNumPages(data.pagination.totalPages)
            setQueryCars(data)
        }
        mamaVergaAsync()
    },[filtros])
    const allCarsInfo = queryCars.length === 0 ? [] : queryCars.data;
    return   <section className="cars-space-container">
                <div className="targets-carrousel">
                        {allCarsInfo.map((carInfo) =>(
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
                    <DividerPagesCars queryCars ={numPages}/>
            </section>

}

function DividerPagesCars(numPages){
    const botones = [];
    console.log(numPages.queryCars)
    numPages = parseInt(numPages.queryCars)
    numPages += 6;
    for (let i = 0; i < numPages; i++) {
        botones.push(
            <button key={i}>
                {i + 1}
            </button>
        );
    }

    return  <aside className="divider-bar" >
                <button>Prev</button>
                {botones}
                <button>Next</button>
            </aside>
}



async function  functionQueryCars(filtros){
            let queryString = 'api/autos/obtenerAutos?'  
                Object.entries(filtros).forEach(([key,value])=>{
                    value = value.toLowerCase();
                    
                    if(value !== "todos"){
                        queryString += `${key}=${value}&`;
                    }
                })
            const res = await fetch(queryString,{
                    method:'GET'
                });
            const json = await res.json()
            return json;
        }
