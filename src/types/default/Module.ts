export type permiso = {
    rutafront : {
        ruta : string
        nombre : string
    }
}

export type Module = {
    nombre : string;
    icono : string;
    permisos : permiso[];
}