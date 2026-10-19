
import { TotalCars } from "./components_car_page/total-cars"
import { obtenerMarcasModelos } from "../administration/crear-auto/page"
export default async function CarPage(){
    const [marcasSelect,modelosSelect] = await obtenerMarcasModelos();
    return  <div>
                <TotalCars marcasSelect={marcasSelect}
                            modelosSelect={modelosSelect}/>
            </div>
}
