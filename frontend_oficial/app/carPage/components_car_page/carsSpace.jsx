'use client'

import { useEffect, useState } from "react";
import { CarTargetComp } from "@/components/car_target_carrousel";
import "./total-cars.css";

const CARS_PER_PAGE = 12;

export function CarsSpace({ filtros }) {

    const [queryCars, setQueryCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    // Cada vez que cambian los filtros,
    // volvemos a la página 1.
    useEffect(() => {
        setCurrentPage(1);
    }, [JSON.stringify(filtros)]);


    // Cada vez que cambia la página o los filtros,
    // hacemos una nueva petición al endpoint.
    useEffect(() => {

        async function getCars() {

            setLoading(true);

            try {

                const data = await functionQueryCars(
                    filtros,
                    currentPage
                );

                if (data.ok) {
                    setQueryCars(data.data);
                    setTotalPages(data.pagination.totalPages);
                } else {
                    setQueryCars([]);
                    setTotalPages(1);
                }

            } catch (error) {

                console.error("Error obteniendo autos:", error);

                setQueryCars([]);
                setTotalPages(1);

            } finally {
                setLoading(false);
            }
        }

        getCars();

    }, [JSON.stringify(filtros), currentPage]);


    return (
        <section className="cars-space-container">

            <div className="just-cars">

                {loading ? (

                    <p>Cargando autos...</p>

                ) : (

                    queryCars.map((carInfo) => (
                        <CarTargetComp
                            key={carInfo.id}
                            brand={carInfo.marca}
                            model={carInfo.modelo}
                            year={carInfo.anio}
                            price={carInfo.precio}
                            urlImage={carInfo.urlImagen[0]}
                        />
                    ))

                )}

            </div>


            <DividerPagesCars
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        </section>
    );
}


function DividerPagesCars({
    totalPages,
    currentPage,
    setCurrentPage
}) {

    // Si solamente hay una página,
    // no mostramos absolutamente nada.
    if (totalPages <= 1) {
        return null;
    }


    const botones = [];

    for (let i = 1; i <= 3; i++) {

        botones.push(
            <button
                className={currentPage === i ? "number-button actual": "number-button no-actual"}
                key={i}
                onClick={() => setCurrentPage(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );

    }
    if (totalPages > 3) {
        botones.push(
            <span key="dots">...</span>
        );

        botones.push(
            <button
                className={
                    currentPage === totalPages
                        ? "number-button actual"
                        : "number-button no-actual"
                }
                key={totalPages}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
            >
                {totalPages}
            </button>
        );
    }

    return (
        <aside className="divider-bar">

            <button
                className="change-page-button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
                Prev
            </button>


            {botones}
            

            <button
                className="change-page-button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/></svg>
            </button>

        </aside>
    );
}


async function functionQueryCars(filtros, page) {

    const params = new URLSearchParams();

    // Siempre pedimos 12 autos por página
    params.set("page", page);
    params.set("limit", CARS_PER_PAGE);


    // Solamente agregamos los filtros
    // cuyo valor NO sea "todos".
    Object.entries(filtros).forEach(([key, value]) => {

        if (value && value.toLowerCase() !== "todos") {
            params.set(key, value);
        }

    });


    const queryString = `/api/autos/obtenerAutos?${params.toString()}`;

    console.log("Consultando:", queryString);


    const res = await fetch(queryString, {
        method: "GET"
    });


    if (!res.ok) {
        throw new Error("No se pudieron obtener los autos");
    }


    return await res.json();
}