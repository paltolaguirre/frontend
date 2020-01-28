import { Legajo } from '../legajo/legajo.model';

export interface Siradig {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    legajo: Legajo;
    legajoid: number;
    periodosiradig: string;
    detallecargofamiliarsiradig: any[];
    importegananciasotroempleosiradig: any[];
    deducciondesgravacionsiradig: any[];
    retencionpercepcionsiradig: any[];
    beneficiosiradig: any[];
    ajustesiradig: any[];
}

export interface Localidad {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
    provinciaid: number;
}

export interface Provincia {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
    paisid: number;
}

export interface Pais {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface Zona {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface ModalidadContratacion {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface Situacion {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface Condicion {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface CondicionSiniestrado {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface ObraSocial {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface ConvenioColectivo {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface Conyuge {
    ID?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    apellido: string;
    codigo: string;
    descripcion: string;
    activo: number;
    cuil: string;
    obrasocial?: ObraSocial;
    obrasocialid: number;
    legajoid?: number;
}

export interface Hijo {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    nombre: string;
    apellido: string;
    codigo: string;
    descripcion?: string;
    activo?: number;
    cuil: string;
    obrasocial?: ObraSocial;
    obrasocialid: number;
    beneficiarioasignacionfamiliar: boolean;
    legajoid?: number;
}

export interface CentroDeCosto {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}

export interface EstadoCivil {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
}