

import { Legajo, Hijo, Situacion } from '../legajo/legajo.model';
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
    tipo : Tipo;
    tipoid : number;
    fecha : string;
    fechaultimodepositoaportejubilatorio : string;
    fechaultimodepositoaportejubilatoriomes : string;
    fechaultimodepositoaportejubilatorioanio : string;
    zonatrabajo : string;
    condicionpago : number;
    condicionpagos : Condicionpago;
    cuentabancoid : number;
    cuentabanco?: Banco;
    bancoaportejubilatorio? : Banco;
    bancoaportejubilatorioid? : number;
    banco : Banco;
    fechaperiododepositado : string;
    fechaperiododepositadomes : string;
    fechaperiododepositadoanio : string;
    fechaperiodoliquidacion : string;
    fechaperiodoliquidacionmes : string;
    fechaperiodoliquidacionanio : string;
    importesremunerativos : Liquidacionitem[];
    importesnoremunerativos : Liquidacionitem[];
    descuentos : Liquidacionitem[];
    retenciones : Liquidacionitem[];
    aportespatronales  : Liquidacionitem[];
    liquidacionitems?: Liquidacionitem[];
    estacontabilizada?: boolean;
    cantidaddiastrabajados?: number;
    situacionrevistauno:Situacion;
    situacionrevistaunoid:number;
    situacionrevistados?: Situacion;
    situacionrevistadosid?: number;
    situacionrevistatres?: Situacion;
    situacionrevistatresid?: number;
    fechasituacionrevistauno:string;
    fechasituacionrevistados?: string;
    fechasituacionrevistatres?: string;
}

export interface Tipo {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    codigo: string;
    descripcion: string;
    activo?: number;
    nombre?: string;
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
export interface Aportespatronales {
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
export interface Liquidacionitem {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    concepto: Concepto;
    conceptoid: number;
    importeunitario: number;
    cantidad?: number;
    acumuladores?: Acumulador[];
}

export interface Acumulador {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: Date;
    nombre: string;
    codigo: string;
    orden: number;
    importe: number;
    tope?: number;
    liquidacionitemid?: number;
    esSubtotal?: boolean;
    esSubtitulo?: boolean;
    esmostrable?: boolean;
}

export interface Fechaliquidaciones {
    fechaliquidaciones : string;
}

export interface LiquidacionCalculada {
    liquidacion: Liquidacion;
    calculo: LiquidacionItems;
    hijosasignacionfamiliar: Hijo[];
}

export interface LiquidacionItems {
    items: Item[];
    total: {
        remunerativo: number;
        noremunerativo: number;
        descuento: number;
        retencion: number;
        neto: number;
    }
}

export enum TipoItem {
    Remunerativo = "REMUNERATIVO",
    NoRemunerativo = "NOREMUNERATIVO",
    Descuento = "DESCUENTO",
    Retencion = "RETENCION",
}

export interface Item {
    codigo: string;
    detalle: string;
    cantidad: number;
    importe: number;
    tipo: TipoItem;
}

export interface DuplicarLiquidaciones {
    liquidaciondefaultvalues: LiquidacionDefaultValues;
    idstoreplicate: number[];
}

export interface LiquidacionDefaultValues {
    tipoid: number;
    fecha: string;
    fechaperiododepositado: string;
    fechaperiodoliquidacion: string;
    fechaultimodepositoaportejubilatorio: string;
}

export interface ResultProcesamientoMasivo {
    processid: string;
    result: ProcesamientoStatus;
}

export interface ProcesamientoStatus {
    id: number;
    tipo: string;
    codigo: number;
    mensaje: string;
}

export interface Contabilizar {
    idsliquidacionesacontabilizar: number[];
    descripcion: string;
    fechaasiento: string;
}

export interface CalculoAutomatico {
    conceptoid: number;
    importeunitario: number;
    acumuladores?: Acumulador[];
}