import { ComplementBannerHome } from "@/components/message_complement_banner"
import { MessageBanner } from "@/components/message_service_banner"
import { CarCarruselComp } from "@/components/principal_carrousel"
import { TargetsCarrouselComp } from "@/components/car_target_carrousel"
import { Location } from "@/components/google_map_comp"
export default function HomePage(){
    return <>
            <svg width="0" height="0">
                <filter id="liquid">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.01"
                        numOctaves="2"
                        result="noise"/>

                    <feGaussianBlur
                        in="noise"
                        stdDeviation="0.3"
                        result="blur"/>

                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="blur"
                        scale="40"/>
                </filter>
            </svg>


            <CarCarruselComp/>
            <MessageBanner/>
            <TargetsCarrouselComp/>
            <ComplementBannerHome/>
            <Location/>
            
    </> 
        
}