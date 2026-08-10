'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { marcaSchema } from '@/lib/validations/marca';
import { modeloSchema } from '@/lib/validations/modelo';

export default function MarcasModelosForms({ initialMarcas }) {
    const [marcas, setMarcas] = useState(initialMarcas);

    return (
        <div className="marcas-modelos-forms">
            <CrearMarcaForm onMarcaCreada={(marca) => setMarcas((prev) => [...prev, marca].sort((a, b) => a.nombre.localeCompare(b.nombre)))} />
            <CrearModeloForm marcas={marcas} />
        </div>
    );
}

function CrearMarcaForm({ onMarcaCreada }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(marcaSchema), defaultValues: { nombre: '' } });

    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const onSubmit = async (data) => {
        setServerError(null);
        setSuccessMessage(null);

        const res = await fetch('/api/marcas/crearMarca', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!json.ok) {
            setServerError(json.message);
            return;
        }

        setSuccessMessage(`Marca "${json.data.nombre}" creada correctamente`);
        onMarcaCreada(json.data);
        reset();
    };

    return (
        <form className="marca-modelo-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Agregar marca</h2>

            <div className="form-field">
                <label htmlFor="marca-nombre">Nombre</label>
                <input id="marca-nombre" {...register('nombre')} />
                {errors.nombre && <span className="field-error">{errors.nombre.message}</span>}
            </div>

            {serverError && <p className="form-error">{serverError}</p>}
            {successMessage && <p className="form-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear marca'}
            </button>
        </form>
    );
}

function CrearModeloForm({ marcas }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(modeloSchema),
        defaultValues: { nombre: '', marcaId: '' },
    });

    const [serverError, setServerError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const onSubmit = async (data) => {
        setServerError(null);
        setSuccessMessage(null);

        const res = await fetch('/api/modelos/crearModelo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const json = await res.json();

        if (!json.ok) {
            setServerError(json.message);
            return;
        }

        setSuccessMessage(`Modelo "${json.data.nombre}" creado correctamente`);
        reset();
    };

    return (
        <form className="marca-modelo-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Agregar modelo</h2>

            <div className="form-field">
                <label htmlFor="modelo-marcaId">Marca</label>
                <select id="modelo-marcaId" defaultValue="" {...register('marcaId')}>
                    <option value="" disabled>
                        Elegí una marca
                    </option>
                    {marcas.map((marca) => (
                        <option key={marca.id} value={marca.id}>
                            {marca.nombre}
                        </option>
                    ))}
                </select>
                {errors.marcaId && <span className="field-error">{errors.marcaId.message}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="modelo-nombre">Nombre</label>
                <input id="modelo-nombre" {...register('nombre')} />
                {errors.nombre && <span className="field-error">{errors.nombre.message}</span>}
            </div>

            {serverError && <p className="form-error">{serverError}</p>}
            {successMessage && <p className="form-success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting || marcas.length === 0}>
                {isSubmitting ? 'Creando...' : 'Crear modelo'}
            </button>
        </form>
    );
}
