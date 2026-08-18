'use client'
import "./eleccion-auto.css"

export function EleccionAutoComponent({setCarInfo}) {
    const answer = async () => {
        const patente = document.querySelector('#buscar-auto').value; /**NOOOO */

        const res = await fetch(
            `/api/autos/obtenerAutoPorPatente?patente=${encodeURIComponent(patente)}`
        );

        const json = await res.json();
        
        setCarInfo(passDataCar(json))
    };

    return (
        <aside className="eleccion-container">
            <label htmlFor="buscar-auto">
                Buscar un auto que desea eliminar o modificar
            </label>

            <input
                id="buscar-auto"
                name="buscar-auto"
                type="text"
            />

            <button onClick={answer}> {/**CONVIENE TRANSOFORMAR TODO A FORM PARA EVITAR LA QUERY DEL INPUT */}
                BUSCAR AUTO
            </button>
        </aside>
    );
}


function passDataCar(json){
    const newObjCar = {}
    newObjCar["anio"] = json.data.anio;
    newObjCar["marca"] = json.data.marca;
    newObjCar["modelo"] = json.data.modelo;
    newObjCar["kilometraje"] = json.data.kilometraje;
    newObjCar["patente"] = json.data.patente;
    newObjCar["precio"] = json.data.precio;
    newObjCar["estado"] = json.data.estado;
    newObjCar["descripcion"] = json.data.descripcion;
    newObjCar["imagenes"] = json.data.imagenes;
    return newObjCar
}