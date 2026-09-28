import "./global.css"
import Image from "next/image";

export function CarContact(){
    const message = "Hola, quiero consultar por los autos disponibles.";
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatsappUrl = phone
        ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;

    return (
        <a
            className="whatsapp-contact"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Consultar por WhatsApp"
        >
            <span className="whatsapp-message">¿Buscás un auto? Escribinos</span>
            <span className="whatsapp-button-icon">
                <Image src="/images/WhatsApp_icon.png" alt="" width={34} height={34} />
            </span>
        </a>
    );
}