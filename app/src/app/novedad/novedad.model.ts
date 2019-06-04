
import { Legajo } from '../legajo/legajo.model';
import { Concepto } from '../concepto/concepto.model';

export interface Novedad {  
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
    importe: number;
    cantidad: number;
    fecha: string;
    legajo: Legajo;
    legajoid: number;
    concepto: Concepto;
    conceptoid: number;
}