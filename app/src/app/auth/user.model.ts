export interface User {
    id?: number;
    username: string;
    pass: string;
    tenant?: string;
    token?: string;
    Authorization?: string;
    fechacreacion?: string;
}
