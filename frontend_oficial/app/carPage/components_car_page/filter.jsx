'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './filter.css';

const initialValues = {
  marca: '',
  modelo: '',
  anioMin: '',
  anioMax: '',
  precioMin: '',
  precioMax: '',
  kilometrajeMax: '',
  estado: '',
};

export function Filter({ setFiltros, marcasSelect, modelosSelect }) {
  const { register, watch, reset } = useForm({ defaultValues: initialValues });
  const filtros = watch();

  useEffect(() => {
    const filtrosActivos = Object.fromEntries(
      Object.entries(filtros).filter(([, value]) => value !== '' && value !== null && value !== undefined)
    );
    setFiltros(filtrosActivos);
  }, [filtros, setFiltros]);

  return (
    <section className="filter-container">
      <header>
        <h2>FILTROS</h2>
      </header>

      <form>
        <SelectField id="marca" label="Marca" register={register}>
          <option value="">Todas</option>
          {marcasSelect.map((marca) => (
            <option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
          ))}
        </SelectField>

        <SelectField id="modelo" label="Modelo" register={register}>
          <option value="">Todos</option>
          {modelosSelect.map((modelo) => (
            <option key={modelo.id} value={modelo.nombre}>{modelo.nombre}</option>
          ))}
        </SelectField>

        <RangeField label="Año" minName="anioMin" maxName="anioMax" register={register} />
        <RangeField label="Precio" minName="precioMin" maxName="precioMax" register={register} step="0.01" />

        <label htmlFor="kilometrajeMax">Kilometraje máximo</label>
        <input id="kilometrajeMax" type="number" min="0" {...register('kilometrajeMax')} />

        <SelectField id="estado" label="Estado" register={register}>
          <option value="">Todos</option>
          <option value="OKM">0 KM</option>
          <option value="USADO">Usado</option>
        </SelectField>

        <button type="button" onClick={() => reset(initialValues)}>RESETEAR</button>
      </form>
    </section>
  );
}

function SelectField({ id, label, register, children }) {
  return (
    <div className="select-class">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register(id)}>
        {children}
      </select>
    </div>
  );
}

function RangeField({ label, minName, maxName, register, step = '1' }) {
  return (
    <div className="range-field">
      <span>{label}</span>
      <input
        type="number"
        min="0"
        step={step}
        placeholder="Desde"
        aria-label={`${label} desde`}
        {...register(minName)}
      />
      <input
        type="number"
        min="0"
        step={step}
        placeholder="Hasta"
        aria-label={`${label} hasta`}
        {...register(maxName)}
      />
    </div>
  );
}


