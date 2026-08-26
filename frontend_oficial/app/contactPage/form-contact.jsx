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
                    <label htmlFor="nombre">Nombre</label>
                    <input name="nombre" type="text" required {...register("nombre")}></input>


                    <label htmlFor="apellido">Apellido</label>
                    <input name="apellido" type="text" {...register("apellido")}></input>

                    <label htmlFor="tel">Telefono</label>
                    <input name="tel" type="number" {...register("tel")}></input>

                    <label htmlFor="email">E-mail</label>
                    <input name="email" type="email" required {...register("email")}></input>

                    <label htmlFor="consulta">Consulta</label>
                    <textarea name="consulta" type="" required {...register("consulta")}></textarea>
                </fieldset>
                <button type="onSubmit">Enviar</button>
            </form>
}