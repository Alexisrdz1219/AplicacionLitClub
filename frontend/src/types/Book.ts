export interface Book {
  id: number;
  nombre: string;
  frase: string;
  descripcion: string;
  autor: string;
  paginas: number;
  imagen_url: string;
  stock: number; // ✅ Agregamos stock
}
