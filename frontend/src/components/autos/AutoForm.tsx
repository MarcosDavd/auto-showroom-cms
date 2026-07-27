import React, { useState } from 'react';
import type { CreateAutoDTO } from '../../types/auto.type';
import { createAuto } from '../../api/autos.api';

export const AutoForm = () => {
  const [formData, setFormData] = useState<CreateAutoDTO>({
    marca: '',
    modelo: '',
    anio: '',
    kilometraje: '',
    patente: '',
    precio: '',
    descripcion: ''
  });

  // 1. Manejamos los archivos como un Array de File en lugar de FileList
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Acumulamos las imágenes seleccionadas y aplicamos límite de 10 imágenes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    setSelectedFiles((prevFiles) => {
      const mergedFiles = [...prevFiles, ...filesArray];
      const uniqueFiles = mergedFiles.filter((file, index, array) => {
        return index === array.findIndex((candidate) => (
          candidate.name === file.name &&
          candidate.size === file.size &&
          candidate.lastModified === file.lastModified
        ));
      });

      const limitedFiles = uniqueFiles.slice(0, 10);

      if (uniqueFiles.length > 10) {
        setMessage('⚠️ Solo se pueden subir un máximo de 10 imágenes.');
      } else {
        setMessage('');
      }

      return limitedFiles;
    });

    e.target.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 3. Enviamos selectedFiles directamente si contiene elementos
      const response = await createAuto({
        ...formData,
        images: selectedFiles.length > 0 ? selectedFiles : undefined
      });
      
      setMessage(`✅ ${response.message || 'Auto registrado con éxito'}`);
      
      // Limpiar el formulario si el envío fue exitoso
      setFormData({
        marca: '',
        modelo: '',
        anio: '',
        kilometraje: '',
        patente: '',
        precio: '',
        descripcion: ''
      });
      setSelectedFiles([]);

    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-slate-800 text-white rounded-lg space-y-4">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Vehículo</h2>
      
      {message && <p className="p-2 bg-slate-700 rounded text-sm">{message}</p>}

      <div className="grid grid-cols-2 gap-4">
        <input name="marca" value={formData.marca} placeholder="Marca" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
        <input name="modelo" value={formData.modelo} placeholder="Modelo" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
        <input name="anio" value={formData.anio} type="number" placeholder="Año" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
        <input name="kilometraje" value={formData.kilometraje} type="number" placeholder="Kilometraje" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
        <input name="patente" value={formData.patente} placeholder="Patente" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
        <input name="precio" value={formData.precio} type="number" placeholder="Precio ($)" onChange={handleChange} required className="p-2 bg-slate-900 rounded border border-slate-700" />
      </div>

      <textarea name="descripcion" value={formData.descripcion} placeholder="Descripción (máx 1000 caracteres)" maxLength={1000} onChange={handleChange} className="w-full p-2 bg-slate-900 rounded border border-slate-700" />

      <div>
        <label className="block text-sm mb-1">Imágenes del auto (máx 10):</label>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full p-2 bg-slate-900 rounded border border-slate-700 text-sm" 
        />
        {/* Indicador visual de archivos seleccionados */}
        {selectedFiles.length > 0 && (
          <p className="text-xs text-slate-400 mt-1">
            📷 {selectedFiles.length} {selectedFiles.length === 1 ? 'imagen seleccionada' : 'imágenes seleccionadas'}
          </p>
        )}
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold transition disabled:opacity-50">
        {loading ? 'Subiendo datos e imágenes...' : 'Guardar Auto'}
      </button>
    </form>
  );
};