export interface Librosueldos {  
    Legajo: string;
    Fechaperiodoliquidacion: string;
    Concepto: string;
    Importe: number;
    activo: number;
}

export interface LibrosueldosEncabezado {
    actividadempresa: string;
    cuitempresa: string;
    descripcion: string;
    domicilioempresa: string;
    nombreempresa: string;
}