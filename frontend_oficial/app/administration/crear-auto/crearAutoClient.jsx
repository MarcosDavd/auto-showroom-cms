'use client'

import { useState } from 'react';
import { BackButton } from '@/components/back_button';
import { EleccionAutoComponent} from './eleccion-auto';
import {CrearAutoForm} from './CrearAutoForm'
import './crear-auto.css';

export function CrearAutoClient({ marcas, modelos }) {
  const [carInfo, setCarInfo] = useState({
    id:"",
    marca: "",
    modelo: "",
    anio: "",
    kilometraje: "",
    patente: "",
    precio: "",
    estado: "",
    descripcion: "",
    imagenes: [],
    imagenesId: [],
  }); 
    return (
    <section className="page-crear-auto">
      <BackButton href="/administration" />
      <EleccionAutoComponent 
        setCarInfo={setCarInfo}/> 
      <CrearAutoForm
        carInfo={carInfo}
        marcas={marcas}
        modelos={modelos}
      />
      
    </section>
  );
  
}