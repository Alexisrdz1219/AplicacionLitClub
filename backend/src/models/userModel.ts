export interface User {
    id: number;
    nombre: string;
    email: string;
    rol: "administrador" | "usuario";
    fecha_ingreso: Date;
    contraseña: string;
  }
  