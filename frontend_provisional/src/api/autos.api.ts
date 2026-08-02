import type { CreateAutoDTO } from '../types/auto.type';
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/autos/crearAuto';
export const createAuto = async (data:CreateAutoDTO) => {
    /* 
    FormData: Es un objeto especial del navegador diseñado 
    para simular un formulario HTML enviando datos bajo la codificación multipart/form-data.
    */ 

    const formData = new FormData();
    formData.append('marca', data.marca);
    formData.append('modelo', data.modelo);
    formData.append('anio', data.anio);
    formData.append('kilometraje', data.kilometraje);
    formData.append('patente', data.patente);
    formData.append('precio', data.precio);
    // como es opcional, verificamos si existe antes de agregarlo al formData
    if(data.descripcion) {
        formData.append('descripcion', data.descripcion);
    }
    if(data.images){
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
            // uso el mismo nombre 'images' para que el backend lo reciba 
            // como un array de archivos
        }
    }
    try {
        const response = await axios.post(API_URL, formData, {
            timeout: 120000,
            onUploadProgress: (e) => {
                if (e.total) {
                const percent = Math.round((e.loaded * 100) / e.total);
                }
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating auto:', error);
        throw error;
    }


}