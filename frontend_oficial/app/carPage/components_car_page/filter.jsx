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

const ESTADOS = [
  { value: '', label: 'Todos' },
  { value: 'OKM', label: '0 KM' },
  { value: 'USADO', label: 'Usado' },
];

export function Filter({ setFiltros, marcasSelect, modelosSelect }) {
  const { register, watch, reset } = useForm({ defaultValues: initialValues });

  // Se suscribe a los cambios del form en vez de re-ejecutarse en cada render
  useEffect(() => {
    const subscription = watch((values) => {
      const filtrosActivos = Object.fromEntries(
        Object.entries(values).filter(
          ([, value]) => value !== '' && value !== null && value !== undefined
        )
      );
      setFiltros(filtrosActivos);
    });
    return () => subscription.unsubscribe();
  }, [watch, setFiltros]);

  return (
    <section className="filter-container">
      <header className="filter-header">
        <h2>Filtros</h2>
        <button type="button" className="filter-reset" onClick={() => reset(initialValues)}>
          Resetear
        </button>
      </header>

      <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
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
        <RangeField
          label="Precio"
          prefix="$"
          minName="precioMin"
          maxName="precioMax"
          register={register}
          step="0.01"
        />

        <div className="field">
          <label htmlFor="kilometrajeMax">Kilometraje máximo</label>
          <div className="input-wrap">
            <input
              id="kilometrajeMax"
              type="number"
              min="0"
              placeholder="Ej: 50000"
              {...register('kilometrajeMax')}
            />
            <span className="suffix">km</span>
          </div>
        </div>

        <div className="field">
          <span className="field-label">Estado</span>
          <div className="segmented" role="radiogroup" aria-label="Estado">
            {ESTADOS.map(({ value, label }) => (
              <label key={label} className="segmented-option">
                <input type="radio" value={value} {...register('estado')} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
}

function SelectField({ id, label, register, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register(id)}>
        {children}
      </select>
    </div>
  );
}

function RangeField({ label, minName, maxName, register, step = '1', prefix }) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <div className="range-row">
        <div className="input-wrap">
          {prefix && <span className="prefix">{prefix}</span>}
          <input
            type="number"
            min="0"
            step={step}
            placeholder="Desde"
            aria-label={`${label} desde`}
            className={prefix ? 'has-prefix' : ''}
            {...register(minName)}
          />
        </div>
        <span className="range-dash">—</span>
        <div className="input-wrap">
          {prefix && <span className="prefix">{prefix}</span>}
          <input
            type="number"
            min="0"
            step={step}
            placeholder="Hasta"
            aria-label={`${label} hasta`}
            className={prefix ? 'has-prefix' : ''}
            {...register(maxName)}
          />
        </div>
      </div>
    </div>
  );
}