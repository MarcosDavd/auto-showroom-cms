    'use client'
import { useForm } from "react-hook-form";
import "./filter.css"
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
    const { register, reset: rhfReset, getValues } = useForm({
        defaultValues: {
            transmision: "Todos",
        },
    });

    function resetForm() {
        // Mostrar valores internos antes del reset
        console.log('>>> antes reset', getValues());

        // Pasar explícitamente los valores a reset garantiza que el formulario
        // vuelva a los valores esperados incluso si algo fuera del formulario
        // interfiere con los defaultValues iniciales.
        rhfReset({ transmision: 'Todos' });

        // Mostrar valores internos después del reset
        console.log('<<< despues reset', getValues());
    }

    return (
        <form className="filter-container">
            <select {...register('transmision')}>
                <option value="Todos">Todos</option>
                <option value="Automatico">Automatico</option>
                <option value="Manual">Manual</option>
            </select>

            <button type="button" onClick={resetForm}>
                RESET
            </button>
        </form>
    );
}
