'use client'

import { useState } from 'react';
import { EleccionAutoComponent} from './eleccion-auto';
import {CrearAutoForm} from './CrearAutoForm'
import './crear-auto.css';

export function CrearAutoClient({ marcas, modelos }) {
  const [carInfo, setCarInfo] = useState({
    marca: "",
    modelo: "",
    anio: "",
    kilometraje: "",
    patente: "",
    precio: "",
    estado: "",
    descripcion: "",
    imagenes: []
  }); 
  return (
    <section className="page-crear-auto">
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