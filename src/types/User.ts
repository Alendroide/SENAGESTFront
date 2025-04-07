export type User = {
    isAuthenticated: boolean;
    sub: number | null;
    identificacion: string | null;
    nombre: string | null;
    correo : string | null;
    img : string | null;
    rol : string | null;
}