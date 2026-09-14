import { Controller } from "react-hook-form";

////////////////////////////////////////////////////////////////
///////////CONTROLLERS////////////////////////////////
////////////////////////////////////////////////////////////////

export function ControllerInputForm({inputId,nameLabel,type,hasStep,numberStep,control,errors}){
  return <Controller
                name={inputId}
                control={control}
                render={({field}) =>(
                  <InputcontrolForm inputId={inputId}
                               nameLabel={nameLabel}
                               type={type}
                               hasStep={hasStep}
                               numberStep={numberStep}
                               field={field}
                               errors={errors}  />
                )} 
        />
}
export function ControllerSelectModelo({control,marca,modelosDisponibles,errors}){
  return <Controller
                name="modelo"
                control={control}
                render={({field}) =>(
                  <SelectModelo field={field}
                                marca={marca}                               
                                modelosDisponibles={modelosDisponibles}
                                errors={errors}/>
                )} 
        />
}
export function ControllerEstado({control,errors}){
  return <Controller
                name="estado"
                control={control}
                render={({field}) =>(
                <SelectEstado field={field}
                              errors={errors}  />
                )} 
        />
}
export function ControllerSelectMarca({marcas,control,errors,setValue}){
  return <Controller
                name="marca"
                control={control}
                render={({field}) =>(
                  <SelectMarca marcas={marcas}
                               marcaField={field}
                               errors={errors}
                               setValue={setValue}  />
                )} 
        />
}
export function ControllerDescripcion({control,errors}){
  return <Controller
                name="descripcion"
                control={control}
                render={({field}) =>(
                  <DescripcionInput  field={field} 
                                      errors={errors}/>
                )} 
        />
}
////////////////////////////////////////////////////////////////
///////////////FUNCTIONS INTO CONTROLLERS////////////////////////////////
////////////////////////////////////////////////////////////////


function InputcontrolForm({inputId,nameLabel,type,hasStep,numberStep,field,errors}){
  return  <div className="form-field">
            <label htmlFor={inputId}>{nameLabel}</label>
            <input id={inputId} type={type} step={hasStep ? numberStep : undefined} {...field} />
            {errors[inputId] && <span className="field-error">{errors[inputId].message}</span>}
        </div>
}

function SelectMarca({marcas,marcaField,errors,setValue}){
  return  <div className="form-field">
                <label htmlFor="marca">Marca</label>
                <select id="marca"
                        {...marcaField}
                        onChange={(e) => {
                          marcaField.onChange(e);
                          setValue('modelo', '');
                        }}
                    
                >
                  <option value="" disabled>
                    Elegí una marca
                  </option>
                  {marcas.map((m) => (
                    <option key={m.id} value={m.nombre}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
                {errors.marca && <span className="field-error">{errors.marca.message}</span>}
              </div>
}


function SelectModelo({field,marca,modelosDisponibles,errors}){
  return  <div className="form-field">
            <label htmlFor="modelo">Modelo</label>
            <select id="modelo" {...field} disabled={!marca}>
              <option value="" disabled>
                {marca ? 'Elegí un modelo' : 'Elegí primero una marca'}
              </option>
              {modelosDisponibles.map((modelo) => (
                <option key={modelo.id} value={modelo.nombre}>
                  {modelo.nombre}
                </option>
              ))}
            </select>
            {errors.modelo && <span className="field-error">{errors.modelo.message}</span>}
          </div>
}

export function InputImages({fileInputRef,addFiles,images,removeImage,errors}){
  return <div className="form-field">
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
}



function SelectEstado({field,errors}){
  return  <div className="form-field">
            <label htmlFor="estado">Estado</label>
            <select id="estado" {...field}>
              <option value="" disabled>
                Elegí el estado
              </option>
              <option value="OKM">0km</option>
              <option value="USADO">Usado</option>
            </select>
            {errors.estado && <span className="field-error">{errors.estado.message}</span>}
          </div>
}

function DescripcionInput({field,errors}){
    return  <div className="form-field">
              <label htmlFor="descripcion">Descripción</label>
              <textarea id="descripcion" {...field} />
              {errors.descripcion && (
                <span className="field-error">{errors.descripcion.message}</span>
              )}
            </div>
}

export function getPublicIdFromUrl(url) {
  const parts = url.split("/upload/");

  if (parts.length !== 2) {
    throw new Error("URL de Cloudinary inválida");
  }

  let publicId = parts[1];

  // Quitar transformaciones/versiones si existen
  publicId = publicId.replace(/^v\d+\//, "");

  // Quitar extensión
  publicId = publicId.replace(/\.[^/.]+$/, "");
  
  return publicId;
}


