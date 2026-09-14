<<<<<<< HEAD
import { Filter } from "./filter"
import "./total-cars.css"
export function TotalCars(){
    return  <main className="total-cars-container">
                <Filter/>
                <div>
                    <CarsSpace/>
                    <DividerPagesCars/>
                </div>
            </main>
}
function DividerPagesCars(){
    return  <aside className="divider-bar">
                <button>Prev</button>
                <div>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </div>
                <button>Next</button>
            </aside>
}
function CarsSpace(){
    return   <section className="cars-space-container">

                

            </section>

}
=======
'use client'
import { useState } from "react"
import { Filter } from "./filter"
import { CarsSpace } from "./carsSpace"
import "./total-cars.css"
export function TotalCars({marcasSelect,modelosSelect}){
    const [filtros,setFiltros] = useState({});
    return  <main className="total-cars-container">
                <Filter setFiltros ={setFiltros}
                        marcasSelect={marcasSelect}
                        modelosSelect={modelosSelect}/>
                <CarsSpace filtros = {filtros}/>
                    
            </main>
}









>>>>>>> origin/feature/carSpaceDetails
