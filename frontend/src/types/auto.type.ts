export interface Auto {
  id?: number;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  patente: string;
  precio: number;
  descripcion?: string;
  urlImagen?: string[];
}
//CreateAutoDTO (Objeto de Transferencia de Datos
export interface CreateAutoDTO {
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  patente: string;
  precio: string;
  descripcion?: string;
  images?: FileList | File[];
}