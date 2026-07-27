import "./google_map_comp.css"

export function Location(){
    return <div className="location">
                <p>Acercaté a nuestra concecionaria</p>
                <GoogleMap/>
            </div>
}

export function GoogleMap(){
    return <div className="google-map">
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.5410987837913!2d-57.95644052378568!3d-34.92177021883844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e62e2b2ca09b%3A0x7404585c354a6d1a!2sMunicipalidad%20de%20La%20Plata!5e0!3m2!1ses-419!2sar!4v1784641353882!5m2!1ses-419!2sar"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            />
            </div>
}