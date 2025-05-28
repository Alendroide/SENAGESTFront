export type Permiso = {
    nombre: string;
    tipo: string;
}

export type RutaFront = {
    nombre: string;
    ruta: string;
    permisos: Permiso[];
}

export type Modulo = {
    nombre : string;
    icono : string;
    rutas: RutaFront[]
}