export interface UserBook {
    id: number;
    nombre: string;
    autor: string;
    imagen_url: string;
    tipo: "compra" | "prestamo";
    fecha: string;
  }
  