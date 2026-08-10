'use client'
import { useState } from "react";
import "./filter.css"
export function Filter(){
    const [filtros, setFiltros] = useState({
                                            transmision: "",
                                            combustible: "",
                                            marca: "",
                                            color: "",
                                            modelo: ""
                                        });
    
    function cambiarEstado(key,value){
        setFiltros({
            ...filtros,
            [key]:value
        })
    }    
    
    
    console.log(filtros)
    const optionsTransmision = ["Todos","Automatico","Manual"];
    const optionsMarca = ["Todos","Toyota","Fiat","Chebrolet","Renault","Peugeut","Mazda","Zuru"];
    const optionsCombusible = ["Todos","Diesel","Nafta","Electrico","Hibrido"];
    return <section className="filter-container">
                <header>
                    <h2>FILTROS</h2>    
                </header>
                <form>
                   
                    <SelectOption 
                                options={optionsTransmision}
                                name = "Transmision"
                                cambiarEstado={cambiarEstado}/>
                    <SelectOption 
                                options={optionsCombusible}
                                name = "Combustible"
                                cambiarEstado={cambiarEstado}/>
                    <SelectOption   
                                options={optionsMarca}
                                name = "Marca"
                                cambiarEstado={cambiarEstado}/>
                    <SelectOption   
                                options={optionsTransmision}
                                name = "Transmision"
                                cambiarEstado={cambiarEstado}/>
                    <SelectOption 
                                options={optionsTransmision}
                                name = "Transmision"
                                cambiarEstado={cambiarEstado}/>
                </form>
            </section>
}




function SelectOption({options,name,cambiarEstado}){
    return  <div className="select-class">
                <label htmlFor={name}>{name}</label>
                <select  onChange={(e) => cambiarEstado(name, e.target.value)}>
                    {options.map(element => {
                    return <option key={element} value={element.toLowerCase()}>{element}</option>
                        })
                    }
                </select>
            </div> 
            
}