import { Formula } from '../core/models/formula.model';

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
    cuentacontableid: number;
    cuenta?: Cuenta;
    esimprimible: Boolean;
    esnovedad?: Boolean;
    tipoconceptoid?: number;
    tipoconcepto?:  Tipoconcepto;
    porcentaje?: number;
    tipodecalculo?: object;
    tipodecalculoid?: number;
    prorrateo: boolean;
    basesac: boolean;
    tipoimpuestoganancias: object;
    tipoimpuestogananciasid: number;
    tipocalculoautomatico?: TipoCalculoAutomatico;
    tipocalculoautomaticoid?: number;
    formula?:Formula;
    formulanombre?:string;
    eseditable?: boolean;
    esremvariable: Boolean;
}

export interface Tipoconcepto {  
    ID?: any;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    codigo: string;
    descripcion?: string;
    activo?: Number;
}

export interface Cuenta {  
    ID: any;
    nombre: string;
    codigo?: string;
    descripcion?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    activo?: Number
}

export enum TIPO_CONCEPTO {
    IMPORTE_REMUNERATIVO = -1,
    IMPORTE_NO_REMUNERATIVO = -2,
    DESCUENTO = -3,
    RETENCION = -4,
    APORTE_PATRONAL = 5,
}

export interface TipoCalculoAutomatico {
    ID: any;
    nombre: string;
    codigo?: string;
    descripcion?: string;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    activo?: Number
}

export enum TIPO_CONCEPTO_CODIGO {
    REMUNERATIVO = "IMPORTE_REMUNERATIVO",
    NO_REMUNERATIVO = "IMPORTE_NO_REMUNERATIVO",
    DESCUENTO = "DESCUENTO",
    RETENCION = "RETENCION",
    APORTE_PATRONAL = "APORTE_PATRONAL",
}

export enum TIPO_CALCULO_AUTOMATICO {
    PORCENTAJE = -2,
    FORMULA = -3,
    NO_APLICA = -1
}

export enum TIPO_CALCULO_AUTOMATICO_CODIGO {
    PORCENTAJE = "PORCENTAJE",
    FORMULA = "FORMULA",
    NO_APLICA = "NO_APLICA"
}