'use client'
import { useForm } from "react-hook-form"
import "./form-contact.css"
export function FormContact(){
    const { register,
            reset,
            handleSubmit,
        } = useForm({
            defaultValues: {
            nombre:"",
            apellido:"",
            tel:"",
            email:"",
            consulta:"",
            }
        });
    return  <form onSubmit={handleSubmit} className="form-container">
                <legend></legend>
                <fieldset className="form-content">
                    <FormItem name={"nombre"} title={"Nombre"} register={register} isRequired={true}/>
                    <FormItem name={"apellido"} title={"Apellido"} register={register} isRequired={false}/>
                    <FormItem name={"tel"} title={"Telefono"} register={register} isRequired={true}/>
                    <FormItem name={"email"} title={"E-mail"} register={register} isRequired={true}/>
                    <div className="item-form">
                        <label htmlFor="consulta">Consulta</label>
                        <textarea name="consulta" type="" required {...register("consulta")}></textarea>
                    </div>
                </fieldset>
                <button type="onSubmit">Enviar</button>
            </form>
}

function FormItem({name, title,register, isRequired}){
    return  <div className="item-form">
                <label htmlFor={name}>{title}</label>
                <input name={name} type={name}  {...register("email")} required={isRequired}></input>
            </div>
}