'use client';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { autoSchema } from '@/lib/validations/auto';
import './crear-auto.css';

export default function CrearAutoPage() {
  return (
    <section className="page-crear-auto">
      <CrearAutoForm />
    </section>
  );
}

function CrearAutoForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(autoSchema) });

  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    setImages((prev) => {
      const merged = [...prev];
      for (const file of newFiles) {
        const alreadyAdded = merged.some(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        );
        if (!alreadyAdded) merged.push(file);
      }
      setValue('images', merged, { shouldValidate: true });
      return merged;
    });
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setValue('images', updated, { shouldValidate: true });
      return updated;
    });
  };

  const onSubmit = async (data) => {
    setServerError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('marca', data.marca);
    formData.append('modelo', data.modelo);
    formData.append('anio', String(data.anio));
    formData.append('kilometraje', String(data.kilometraje));
    formData.append('patente', data.patente);
    formData.append('precio', String(data.precio));
    formData.append('descripcion', data.descripcion || '');
    data.images.forEach((file) => formData.append('images', file));

    const res = await fetch('/api/autos/crearAuto', {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();

    if (!json.ok) {
      setServerError(json.message);
      return;
    }

    setSuccessMessage(`Auto creado correctamente (id ${json.data.id})`);
    reset();
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form className="crear-auto-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear auto</h2>

      <div className="form-field">
        <label htmlFor="marca">Marca</label>
        <input id="marca" {...register('marca')} />
        {errors.marca && <span className="field-error">{errors.marca.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="modelo">Modelo</label>
        <input id="modelo" {...register('modelo')} />
        {errors.modelo && <span className="field-error">{errors.modelo.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="anio">Año</label>
        <input id="anio" type="number" {...register('anio')} />
        {errors.anio && <span className="field-error">{errors.anio.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="kilometraje">Kilometraje</label>
        <input id="kilometraje" type="number" {...register('kilometraje')} />
        {errors.kilometraje && (
          <span className="field-error">{errors.kilometraje.message}</span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="patente">Patente</label>
        <input id="patente" {...register('patente')} />
        {errors.patente && <span className="field-error">{errors.patente.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="precio">Precio</label>
        <input id="precio" type="number" step="0.01" {...register('precio')} />
        {errors.precio && <span className="field-error">{errors.precio.message}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" {...register('descripcion')} />
        {errors.descripcion && (
          <span className="field-error">{errors.descripcion.message}</span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="images">Imágenes</label>
        <input
          id="images"
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
        {images.length > 0 && (
          <ul className="image-preview-list">
            {images.map((file, index) => (
              <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                <span>{file.name}</span>
                <button type="button" onClick={() => removeImage(index)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.images && <span className="field-error">{errors.images.message}</span>}
      </div>
      

      {serverError && <p className="form-error">{serverError}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando...' : 'Crear auto'}
      </button>
    </form>
  );
}
