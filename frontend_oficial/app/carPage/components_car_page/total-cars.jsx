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
                <div>
                    <CarsSpace filtros = {filtros}/>
                    
                </div>
            </main>
}









