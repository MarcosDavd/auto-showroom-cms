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
            estado:"Todos",
            marca: "Todos",
            modelo:"Todos",
            }
        });
    const filtros = watch();
    useEffect(()=>{  
        console.log("Filtros en filtros: ", filtros);
        setFiltros(filtros)
    },[filtros]);
    
    const optionsEstado = ["Usado","Okm"];
    const optionsMarca = marcasSelect.map((elemento)=>{return elemento.nombre})
    
    const optionsModelo = modelosSelect.map((elemento)=>{return elemento.nombre})

    return <section className="filter-container">
                <header>
                    <h2>FILTROS</h2>    
                </header>
                <form>
                   
                    <SelectOption 
                                control ={control}                                
                                options={optionsEstado}
                                name = "estado"
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
                        return <option key={element} value={name === "estado" ?  element.toUpperCase() : element.toLowerCase()}>{element}</option>
                            })
                        }
                    </select>
                </div> 
                )}/>           
            
            
}
     







