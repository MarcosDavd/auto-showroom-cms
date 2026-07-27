import "./home.css"

export function MessageBanner(){
    return <section className="message-banner">
                    <MessageTarget titulo=" Nuestros Servicios" texto="" icon={ServiceIcon} />
                    <MessageTarget titulo=" Nuestro Compromiso" texto="" icon={CommitmentIcon} />
            </section>
}

function MessageTarget({titulo,texto, icon:Icon}){
    return  <div className="message-target">
                <h3>
                    <Icon/> 
                    {titulo}
                </h3>
                <p>{texto} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam cumque natus aliquam! Maiores minima, molestias animi temporibus rem sapiente!</p>
            </div>
}

function ServiceIcon(){
    return <svg className="message-icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#414141"><path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z"/></svg>
}
function CommitmentIcon(){
    return <svg className="message-icon"  xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#414141"><path d="M557-518 387-688l57-56 113 113 227-226 56 56-283 283ZM320-220l278 76 238-74q-5-9-14.5-15.5T800-240H598q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T618-354l-234-86h-64v220ZM80-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L600-60l-280-78v58H80Zm80-80h80v-280h-80v280Z"/></svg>
}