    'use client'
import { useForm } from "react-hook-form";
import "./filter.css"
import { useRef } from "react";
{/**


export function Filter(){
    const { register,
            handleSubmit,
            reset,
            getValues,
        } = useForm({
            defaultValues: {
            transmision: "Todos",
            combustible: "Todos",
            marca: "Todos",
            modelo:"Todos",
            }
        });
    
      
    
    
    console.log()
    const optionsTransmision = ["todos","Automatico","Manual"];
    const optionsMarca = ["todos","Toyota","Fiat","Chebrolet","Renault","Peugeut","Mazda","Zuru"];
    const optionsCombusible = ["todos","Diesel","Nafta","Electrico","Hibrido"];
    return <section className="filter-container">
                <header>
                    <h2>FILTROS</h2>    
                </header>
                <form>
                   
                    <SelectOption 
                                register = {register}
                                options={optionsTransmision}
                                name = "transmision"
                                />
                    <SelectOption 
                                register = {register}
                                options={optionsCombusible}
                                name = "combustible"
                                />
                    <SelectOption
                                register = {register}   
                                options={optionsMarca}
                                name = "marca"
                                />
                    <SelectOption
                                register = {register}   
                                options={optionsTransmision}
                                name = "transmision"
                                />
                    <SelectOption
                                register = {register} 
                                options={optionsTransmision}
                                name = "transmision"
                                />
                    <button type="button" onClick={() => reset()}>RESETEAR</button>
                </form>
            </section>
}






function SelectOption({register,options,name}){
    return  <div className="select-class">
                <label htmlFor={name}>{name}</label>
                <select  {...register(name)}>
                    {options.map(element => {
                    return <option key={element} value={element.toLowerCase()}>{element}</option>
                        })
                    }
                </select>
            </div> 
            
}
    */}

export function Filter() {
    const selectRef = useRef(null);

    const {
        register,
        reset,
        getValues
    } = useForm({
        defaultValues: {
            transmision: "Todos"
        }
    });

    console.log(
        "RHF:",
        getValues("transmision")
    );

    function resetForm() {
        console.log(">>> antes reset", getValues());

        console.log(
            "SELECT ANTES:",
            selectRef.current?.value
        );

        reset();

        console.log(
            "<<< despues reset",
            getValues()
        );

        console.log(
            "SELECT DESPUES:",
            selectRef.current?.value
        );
    }

    return (
        <form className="filter-container">

            <select
                {...register("transmision")}
                ref={(element) => {
                    selectRef.current = element;
                }}
            >
                <option value="Todos">Todos</option>
                <option value="Automatico">Automatico</option>
                <option value="Manual">Manual</option>
            </select>

            <button
                type="button"
                onClick={resetForm}
            >
                RESET
            </button>

        </form>
    );
}