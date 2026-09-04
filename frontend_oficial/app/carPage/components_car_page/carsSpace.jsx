'use client'

import { useEffect, useState } from "react";
import { CarTargetComp } from "@/components/car_target_carrousel";
import "./total-cars.css"

export function CarsSpace({ filtros }) {

    const [queryCars, setQueryCars] = useState([]);

    const [numElements, setNumElements] = useState({
        from: 0,
        to: 11
    });

    useEffect(() => {
        async function mamaVergaAsync() {
            const data = await functionQueryCars();
            setQueryCars(data);
        }

        mamaVergaAsync();
    }, []);

    // Cada vez que cambian los filtros, volvemos a la página 1
    useEffect(() => {
        setNumElements({
            from: 0,
            to: 11
        });
    }, [filtros]);


    const allCars = queryCars.length === 0
        ? []
        : queryCars.data;


    // Nos quedamos únicamente con los filtros que no sean "todos"
    const filtrosActivos = Object.entries(filtros)
        .filter(([clave, valor]) => valor.toLowerCase() !== "todos");


    // PRIMER FILTRADO:
    // todos los autos que cumplen las condiciones
    const filteredCars = allCars.filter(car => {
        return filtrosActivos.every(
            ([clave, valor]) => car[clave] === valor
        );
    });


    // Calculamos las páginas sobre TODOS los autos filtrados
    const numPages = Math.ceil(filteredCars.length / 12);


    // SEGUNDO FILTRADO:
    // solamente los autos correspondientes a la página actual
    const allCarsleaked = filteredCars.filter((car, i) => {
        return i >= numElements.from &&
               i <= numElements.to;
    });


    return (
        <section className="cars-space-container">

            <div className="just-cars">

                {allCarsleaked.map((carInfo) => (
                    <CarTargetComp
                        key={carInfo.id}
                        brand={carInfo.marca}
                        model={carInfo.modelo}
                        year={carInfo.anio}
                        price={carInfo.precio}
                        urlImage={carInfo.urlImagen[0]}
                    />
                ))}

            </div>

            <DividerPagesCars
                numPages={numPages}
                setNumElements={setNumElements}
            />

        </section>
    );
}


function DividerPagesCars({ numPages, setNumElements }) {

    const botones = [];

    for (let i = 0; i < numPages; i++) {

        botones.push(
            <button
                key={i}
                onClick={() => {
                    setNumElements({
                        from: 12 * i,
                        to: (12 * (i + 1)) - 1
                    });
                }}
            >
                {i + 1}
            </button>
        );

    }

    return (
        <aside className={numPages > 1 ? "divider-bar visible" : "divider-bar"}>

            <button>Prev</button>

            {botones}

            <button>Next</button>

        </aside>
    );
}


async function functionQueryCars() {

    const queryString = 'api/autos/obtenerAutos';

    const res = await fetch(queryString, {
        method: 'GET'
    });

    const json = await res.json();

    return json;
}

// async function  functionQueryCars(filtros){
//             let queryString = 'api/autos/obtenerAutos?'  
//                 Object.entries(filtros).forEach(([key,value])=>{
//                     value = value.toLowerCase();
                    
//                     if(value !== "todos"){
//                         queryString += `${key}=${value}&`;
//                     }
//                 })
//             const res = await fetch(queryString,{
//                     method:'GET'
//                 });
//             const json = await res.json()
//             return json;
//         }
