import { iconsConfig, typeIcons } from "@/config/icons";
import usePermiso from "@/hooks/default/usePermiso";
import { Module } from "@/types/modules/Module";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

type Permiso = {
    id: number,
    nombre: string,
    descripcion: string,
    tipo: string
}

export default function PermisosTable() {

    const { modulesWithPermisos, isLoading, isError, error } = usePermiso();

    return (
        <>
            {isLoading && <p>Cargando...</p>}
            {isError && <p>Error: {error?.message}</p>}
            {modulesWithPermisos?.map((modulo: Module & { id: number, permisos: Permiso[] }) => (
                <div key={modulo.id}>
                    <h1 className="my-5 font-semibold flex gap-3">{iconsConfig[modulo.icono]}{modulo.nombre}</h1>
                    <Table aria-label={`Tabla${modulo.nombre}`}>
                        <TableHeader>
                            <TableColumn>Nombre</TableColumn>
                            <TableColumn>Descripción</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {modulo.permisos?.length
                                ? modulo.permisos.map((permiso: Permiso) => (
                                    <TableRow key={permiso.id}>
                                        <TableCell className="flex gap-2">{typeIcons[permiso.tipo]}{permiso.nombre}</TableCell>
                                        <TableCell>{permiso.descripcion}</TableCell>
                                    </TableRow>
                                ))
                                : (
                                    <TableRow key="no-permisos">
                                        <TableCell colSpan={2}>No hay permisos disponibles</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            ))}
        </>
    )
}