

import { Legajo } from '../legajo/legajo.model';
import { Concepto } from '../concepto/concepto.model';

export interface Liquidacion {  
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: number;
    legajo: Legajo;
    legajoid: number;
    tipoid : number;
    tipo : Tipo;
    fecha : string;
    fechaultimodepositoaportejubilatorio : string;
    zonatrabajo : string;
    condicionpago : number;
    condicionpagos : Condicionpago;
    cuentabanco : number;
    banco : Banco;
    fechaperiododepositado : string;
    fechaperiodoliquidacion : string;
    importesremunerativos : [Importesremunerativos];
    importesnoremunerativos : [Importesnoremunerativos];
    descuentos : [Descuentos];
    retenciones : [Retenciones];
}

export interface Tipo {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    activo?: number;
}

export interface Condicionpago {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    activo?: number;
}

export interface Banco {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    activo?: number;
}

export interface Importesremunerativos {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    concepto: Concepto;
    conceptoid: number;
    cantidad: number;
    porcentaje: string;
    sobreconcepto: Concepto;
    sobreconceptoid: number;
    activo?: number;
    importeunitario: number;
    total: number;
}

export interface Importesnoremunerativos {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    concepto: Concepto;
    conceptoid: number;
    cantidad: number;
    porcentaje: string;
    sobreconcepto: Concepto;
    sobreconceptoid: number;
    activo?: number;    
    importeunitario: number;    
    total: number;
}

export interface Descuentos {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    concepto: Concepto;
    conceptoid: number;
    cantidad: number;
    porcentaje: string;
    sobreconcepto: Concepto;
    sobreconceptoid: number;
    activo?: number;    
    importeunitario: number;    
    total: number;
}

export interface Retenciones {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    concepto: Concepto;
    conceptoid: number;
    cantidad: number;
    porcentaje: string;
    sobreconcepto: Concepto;
    sobreconceptoid: number;
    activo?: number;    
    importeunitario: number;    
    total: number;
}


export interface Fechaliquidaciones {
    fechaliquidaciones : string;
}

