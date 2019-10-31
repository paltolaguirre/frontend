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

