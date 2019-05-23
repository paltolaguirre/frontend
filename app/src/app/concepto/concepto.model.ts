export interface Concepto {  
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
    tipo: string;
    cuentacontable: number;
}