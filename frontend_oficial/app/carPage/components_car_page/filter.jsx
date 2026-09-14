<<<<<<< HEAD
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
=======
'use client'
import { useForm, Controller } from "react-hook-form";
import "./filter.css"
import { useEffect } from "react";



export function Filter({setFiltros,marcasSelect,modelosSelect}){
    const { control,
            watch,
            reset,
        } = useForm({
            defaultValues: {
            transmision: "Todos",
            combustible: "Todos",
            marca: "Todos",
            modelo:"Todos",
            }
        });
    const filtros = watch();
    useEffect(()=>{  
        console.log("EFFECT TARGETS FILTER");
        setFiltros(filtros)
    },[filtros]);
    
    const optionsTransmision = ["Automatico","Manual"];
    const optionsMarca = marcasSelect.map((elemento)=>{return elemento.nombre})
    const optionsCombusible = ["Diesel","Nafta","Electrico","Hibrido"];
    const optionsModelo = modelosSelect.map((elemento)=>{return elemento.nombre})

    return <section className="filter-container">
                <header>
                    <h2>FILTROS</h2>    
                </header>
                <form>
                   
                    <SelectOption 
                                control ={control}                                
                                options={optionsTransmision}
                                name = "transmision"
                                />
                    <SelectOption 
                                control ={control}                                
                                options={optionsCombusible}
                                name = "combustible"
                                />
                    <SelectOption
                                control ={control}
                                options={optionsMarca}
                                name = "marca"
                                />
                    <SelectOption
                                control ={control}
                                options={optionsModelo}
                                name = "modelo"
                                />
                    
                    <button type="button" onClick={() => reset()}>RESETEAR</button>
                </form>
            </section>
}










function SelectOption({control,options,name}){
    return  <Controller
                name={name}
                control={control}
                render={({field}) =>(
                    <div className="select-class">
                    <label htmlFor={name}>{name}</label>
                    <select  {...field}>
                        <option key="todos" value="todos">Todos</option>
                        {options.map(element => {
                        return <option key={element} value={element.toLowerCase()}>{element}</option>
                            })
                        }
                    </select>
                </div> 
                )}/>           
            
            
}
     







>>>>>>> origin/feature/carSpaceDetails
