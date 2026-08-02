import "./principal_carrousel.css"
export function CarCarruselComp(){
    return  <div className="carrusel-container">
                <p>l k p a</p>
                <section className="carrusel">
                    <div className="curtain"></div>
                    <div className="curtain-decorator"></div>
                    <div className="blur-decorator"></div>
                    <div className="img-filter">
                        <img src="images/carroCarrusel1.avif" className="i1" height={520} width={780}/>
                        <img src="images/carroCarrusel2.jpeg" className="i2" height={388} width={666}/>
                        <img src="images/carroCarrusel3.jpg" className="i3" height={520} width={780}/>  
                        <img src="images/carroCarrusel4.jpg" className="i4" height={520} width={780}/>
                    </div>
                </section>
            </div>
}
