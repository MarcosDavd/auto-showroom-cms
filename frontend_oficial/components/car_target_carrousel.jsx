'use client'
import { useRef } from "react";
import "./car_target_carrousel.css"

function CarTargetComp(){
    return  <div className="car-target">
                <div>
                    <img    src="images/car-example.webp"
                            alt="carro-ejemplo" />
                    <button><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
                </div>
                
                <p>Este es el famoso carro que uso Tony Pro</p>
            </div>
}



export function TargetsCarrouselComp(){

    const carouselRef = useRef(null);

    const next = () => {
        carouselRef.current.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    };

    const previous = () => {
        carouselRef.current.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    };

    return (
        <>
            
                <div className="targets-container">
                    <button className="button-car-carrousel" onClick={previous}>←</button>
                    <div className="targets-carrousel" ref={carouselRef}>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                        <CarTargetComp/>
                    </div>
                     <button className="button-car-carrousel" onClick={next}>→</button>
                </div>
                

           
        </>
    );
}