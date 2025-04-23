export type permiso = {
    rutafront : {
        ruta : string
    }
}

export type Module = {
    nombre : string;
    icono : string;
    permisos : permiso[];
}