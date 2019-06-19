

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
    condicionpago : string;
    bancoid : number;
    banco : Banco;
    fechainicioperiododepositado : string;
    fechafinperiododepositado : string;
    fechainicioperiodoliquidacion : string;
    fechafinperiodoliquidacion : string;
    importesremunerativos : [Importesremunerativos];
    importeremunerativoid : number;
    importesnoremunerativos : [Importesnoremunerativos];
    importenoremunerativoid : number;
    descuentos : [Descuentos];
    descuentoid : number;
    retenciones : [Retenciones];
    retencionid : number;
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
