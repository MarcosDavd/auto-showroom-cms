'use client'
import "./home.css"
import { ObserverComp } from "./features"
export function MessageBanner(){
    const params = ObserverComp();

    return <section className="message-banner" ref={params.refContent}>
                <div>
                    <MessageTarget className="left" titulo=" NUESTROS SERVICIOS" texto="" icon={ServiceIcon} isChange={params.elementShowing} />
                </div>
                <div>
                    <MessageTarget className="right" titulo=" NUESTRA PROMESA" texto="" icon={CommitmentIcon} isChange={params.elementShowing}  />
                </div>         
            </section>
}

function MessageTarget({titulo,texto, icon:Icon,isChange, className}){
    return  <div className={`message-target ${className} ${isChange ? "visible" : ""}`}>
                <h3>
                    <Icon/> 
                    {titulo}
                </h3>
                <p>{texto} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam cumque natus aliquam! Maiores minima, molestias animi temporibus rem sapiente!</p>
            </div>
}

export function ServiceIcon(){
    return <svg className="message-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#d2b35e"><path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/></svg>
}
export function CommitmentIcon(){
    return <svg className="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#d2b35e"><path d="M260-120q-58 0-99-41t-41-99q0-58 41-99t99-41h60v-160h-60q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99v60h160v-60q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41h-60v160h60q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99v-60H400v60q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T320-260v-60h-60q-25 0-42.5 17.5T200-260q0 25 17.5 42.5T260-200Zm440 0q25 0 42.5-17.5T760-260q0-25-17.5-42.5T700-320h-60v60q0 25 17.5 42.5T700-200ZM400-400h160v-160H400v160ZM260-640h60v-60q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm380 0h60q25 0 42.5-17.5T760-700q0-25-17.5-42.5T700-760q-25 0-42.5 17.5T640-700v60Z"/></svg>
}