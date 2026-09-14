<<<<<<< HEAD

import { TotalCars } from "./components_car_page/total-cars"
export default function CarPage(){
    return  <div>
                "BANNER"
                <TotalCars/>
            </div>
}
=======

import { TotalCars } from "./components_car_page/total-cars"
import { obtenerMarcasModelos } from "../administration/crear-auto/page"
export default async function CarPage(){
    const [marcasSelect,modelosSelect] = await obtenerMarcasModelos();
    return  <div>
                "BANNER"
                <TotalCars marcasSelect={marcasSelect}
                            modelosSelect={modelosSelect}/>
            </div>
}
>>>>>>> origin/feature/carSpaceDetails
