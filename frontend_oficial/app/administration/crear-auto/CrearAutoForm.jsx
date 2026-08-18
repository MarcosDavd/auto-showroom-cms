'use client';
import { useEffect,useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { autoSchema } from '@/lib/validations/auto';
import { SelectMarca, SelectModelo, SelectEstado, InputImages, InputRegisterForm } from './componentsAutoForm';

export function CrearAutoForm() {
  const {
    register,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      anio: '',
    },
  });

  return (
    <form>
      <input {...register('anio')} />

      <button
        type="button"
        onClick={() => {
          reset({
            anio: '2020',
          });

          setTimeout(() => {
            console.log('VALOR DESPUÉS DEL RESET:', getValues('anio'));
          }, 100);
        }}
      >
        RESET
      </button>

      <button
        type="button"
        onClick={() => {
          setValue('anio', '2020');

          console.log('VALOR DESPUÉS DE SETVALUE:', getValues('anio'));
        }}
      >
        SET VALUE
      </button>
    </form>
  );
}
{/**
  export function CrearAutoForm({carInfo, marcas, modelos }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(autoSchema),
    defaultValues: {
      marca: '',
      modelo: '',
      anio: '',
      kilometraje: '',
      patente: '',
      precio: '',
      estado: '',
      descripcion: '',
      images: [],
    },
  });

  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const marcaSeleccionada = watch('marca');
  const marca = marcas.find((m) => m.nombre === marcaSeleccionada);
  const modelosDisponibles = marca
    ? modelos.filter((modelo) => modelo.marcaId === marca.id)
    : [];

  const marcaField = register('marca');

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
    formData.append('estado', data.estado);
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

  useEffect(()=>{
    reset({
      marca: carInfo.marca ?? '',
      modelo: carInfo.modelo ?? '',
      anio: carInfo.anio ?? '',
      kilometraje: carInfo.kilometraje ?? '',
      patente: carInfo.patente ?? '',
      precio: carInfo.precio ?? '',
      estado: carInfo.estado ?? '',
      descripcion: carInfo.descripcion ?? '',
      images: [],
    });
  },[carInfo])
    console.log(carInfo)
  
  return (
    <form className="crear-auto-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear auto</h2>

      <div className="marca-modelo-row">
        <div className="marca-modelo-fields">
          
          <SelectMarca marcas ={marcas} marcaField={marcaField} errors={errors}/>
          <SelectModelo register={register} marca={marca} modelosDisponibles={modelosDisponibles} errors={errors}/>
        </div>

        <Link href="/administration/marcas-modelos" className="link-marca-modelo">
          Crear marca o modelo
        </Link>
      </div>
      <InputRegisterForm inputId="anio" nameLabel="Año" type="number" hasStep={true} numberStep={1} register={register} errors={errors} />
      <InputRegisterForm inputId="kilometraje" nameLabel="Kilometraje" type="number" hasStep={true} numberStep={1} register={register} errors={errors} />
      <InputRegisterForm inputId="patente" nameLabel="Patente" type="text" hasStep={false} numberStep={undefined} register={register} errors={errors} />
      <InputRegisterForm inputId="precio" nameLabel="Precio" type="number" hasStep={true} numberStep={0.01} register={register} errors={errors} />

      <SelectEstado register={register} errors={errors}/>

      <div className="form-field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" {...register('descripcion')} />
        {errors.descripcion && (
          <span className="field-error">{errors.descripcion.message}</span>
        )}
      </div>
      <InputImages fileInputRef={fileInputRef} addFiles={addFiles} images={images} errors={errors} />


      {serverError && <p className="form-error">{serverError}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando...' : 'Crear auto'}
      </button>
      <button
        type="button"
        onClick={() =>
          reset({
            marca: "Toyota",
            modelo: "Corolla",
            anio: "2020",
            kilometraje: "50000",
            patente: "ABC123",
            precio: "15000",
            estado: "disponible",
            descripcion: "Prueba",
            images: [],
          })
        }
      >
        PROBAR RESET
      </button>
    </form>
  );
}

  */}


