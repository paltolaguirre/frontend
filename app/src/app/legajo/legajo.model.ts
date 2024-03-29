export interface Legajo {
    ID?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string;
    nombre: string;
    apellido: string;
    codigo: string;
    descripcion: string;
    activo: number;
    legajo: string;
    cuil: string;
    direccion: string;
    localidad?: Localidad,
    localidadid: number;
    provincia?: Provincia;
    provinciaid: number;
    pais?: Pais;
    paisid: number;
    telefono: string;
    email: string;
    modalidadcontratacion?: ModalidadContratacion;
    modalidadcontratacionid: number;
    categoria: string;
    tarea: string;
    situacion?: Situacion;
    situacionid: number;
    condicion?: Condicion;
    condicionid: number;
    condicionsiniestrado?: CondicionSiniestrado;
    condicionsiniestradoid: number;
    obrasocial?: ObraSocial;
    obrasocialid: number;
    conveniocolectivo?: string;
    valorfijolrt: number;
    conyuge: [Conyuge];
    hijos: [Hijo];
    remuneracion: number;
    horasmensualesnormales: string;
    fechaalta: string;
    fechabaja: string;
    centrodecosto?: CentroDeCosto,
    centrodecostoid: number;
    cbu: string;
    estadocivilid?: number;
    estadocivil?: EstadoCivil;
    incluidoencct?:boolean;
    correspondescvo?:boolean;
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