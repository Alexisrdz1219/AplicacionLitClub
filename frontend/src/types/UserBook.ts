export interface UserBook {
    id: number;
    nombre: string;
    autor: string;
    imagen_url: string;
    tipo: "compra" | "renta";
    fecha_vencimiento?: string; // ✅ Puede ser opcional en caso de compras
  }
  