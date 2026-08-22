'use client';
import { useEffect,useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { autoSchema } from '@/lib/validations/auto';
import { ControllerSelectMarca, ControllerSelectModelo, ControllerEstado, InputImages, ControllerInputForm ,ControllerDescripcion} from './componentsAutoForm';


export function CrearAutoForm({carInfo, marcas, modelos}) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
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
  
  let isActiveToShowImagesUrl = false; 
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const marcaSeleccionada = watch('marca');
  const marca = marcas.find((m) => m.nombre === marcaSeleccionada);
  const modelosDisponibles = marca
    ? modelos.filter((modelo) => modelo.marcaId === marca.id)
    : [];


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
    carInfo.imagenes.lenght === 0 ? isActiveToShowImagesUrl = false : isActiveToShowImagesUrl = true 
  },[carInfo])
  
  return (
    <form className="crear-auto-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear auto</h2>

      <div className="marca-modelo-row">
        <div className="marca-modelo-fields">
          
          <ControllerSelectMarca marcas ={marcas} control={control} errors={errors} setValue={setValue}/>
          <ControllerSelectModelo control={control} marca={marca} modelosDisponibles={modelosDisponibles} errors={errors}/>
        </div>

        <Link href="/administration/marcas-modelos" className="link-marca-modelo">
          Crear marca o modelo
        </Link>
      </div>
      <ControllerInputForm inputId="anio" nameLabel="Año" type="number" hasStep={true} numberStep={1} control={control} errors={errors} />
      <ControllerInputForm inputId="kilometraje" nameLabel="Kilometraje" type="number" hasStep={true} numberStep={1} control={control} errors={errors} />
      <ControllerInputForm inputId="patente" nameLabel="Patente" type="text" hasStep={false} numberStep={undefined} control={control} errors={errors} />
      <ControllerInputForm inputId="precio" nameLabel="Precio" type="number" hasStep={true} numberStep={0.01} control={control} errors={errors} />

      <ControllerEstado control={control} errors={errors}/>

      <ControllerDescripcion control={control} errors={errors}/>

      <InputImages fileInputRef={fileInputRef} addFiles={addFiles} images={images} removeImage={removeImage} errors={errors} />
      <ShowImgsUrl carInfo={carInfo}/>

      {serverError && <p className="form-error">{serverError}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creando...' : 'Crear auto'}
      </button>
      <button
        type="button"
        onClick={() =>
          reset({
            marca: "",
            modelo: "",
            anio: "",
            kilometraje: "",
            patente: "",
            precio: "",
            estado: "",
            descripcion: "",
            images: [],
          })
        }
      >
        PROBAR RESET
      </button>
      <button type='button' onClick={() => updateCar(getValues, carInfo,reset)}>Modificar</button>
      <button type='button' onClick={() => deleteCar(carInfo,reset)}>Eliminar</button>
    </form>
  );
}

function ShowImgsUrl({carInfo}){
  
  return  <section className='show-img-url-container'>
            <ul>
              {carInfo["imagenes"].map((img,i)=>{
                return  <li key={img}>
                          <p>Imagen {i === 0 ? "Principal" : `#${i}`}</p>
                          <img src={img}></img>
                          <button onClick={()=>deleteImagesCar(carInfo)}>x</button>
                        </li>
                        
              })}
            </ul>
            
          </section>
}
async function updateCar(getValues,carInfo,reset){
  const data = getValues;
  data.precio = parseFloat(data.precio);
  data.kilometraje = parseInt(data.kilometraje);
  data.anio = parseInt(data.anio);
  const response = await fetch(
        `/api/upload/actualizarAuto?id=${carInfo.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    reset({
            marca: "",
            modelo: "",
            anio: "",
            kilometraje: "",
            patente: "",
            precio: "",
            estado: "",
            descripcion: "",
            images: [],
          })
    console.log(response)
}

async function deleteCar(carInfo,reset){
  await deleteImagesCar(carInfo);
  const response = await fetch(
        `/api/autos/eliminarAuto?id=${carInfo.id}`,
        {
            method: 'DELETE',
        }
    );
    console.log(response)
    reset({
            marca: "",
            modelo: "",
            anio: "",
            kilometraje: "",
            patente: "",
            precio: "",
            estado: "",
            descripcion: "",
            images: [],
          })
}
async function deleteImagesCar(carInfo) {
  const params = new URLSearchParams();
  carInfo.imagenesId.forEach((publicId) => {
    params.append('publicId', publicId);
  });
  const responseImages = await fetch(
    `/api/upload?${params.toString()}`,
    {
        method: 'DELETE'
    }
  );
  console.log(responseImages)
}
































  


