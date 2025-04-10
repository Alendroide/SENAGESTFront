import { Module } from '@/types/Module'

export type User = {
    isAuthenticated: boolean;
    sub: number | null;
    identificacion: string | null;
    nombre: string | null;
    correo : string | null;
    img : string | null;
    rol : string | null;
}

export type JwtPayload = {
    sub: number;
    identificacion: string;
    nombre: string;
    correo : string;
    img : string | null;
    rol : string | null;
    modulos : Module[]
}