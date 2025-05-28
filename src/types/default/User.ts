import { Modulo } from '@/types/default/Modulo'

export type User = {
    sub: number;
    identificacion: string;
    nombre: string;
    correo : string;
    img : string;
    rol : number | undefined;
}

export type JwtPayload = {
    sub : number;
    identificacion : string;
    correo : string;
    img : string;
    rol : number | undefined;
    nombre : string;
    modulos : Modulo[]
}