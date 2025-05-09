import { iconsConfig } from "@/config/icons";
import useRol from "@/hooks/default/useRol";
import { Rol } from "@/types/modules/Permiso";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function RolesTable(){

    const {roles,isLoading,isError,error} = useRol();

    return(
        <Table aria-label="TablaRoles">
            <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Descripción</TableColumn>
            </TableHeader>
            <TableBody>
                {isLoading && <TableRow><TableCell colSpan={2}>Cargando todos los roles...</TableCell></TableRow>}
                {isError && <TableRow><TableCell colSpan={2}>Error: {error?.message}</TableCell></TableRow>}
                {roles?.map((rol : Rol) =>
                    <TableRow key={rol.id}>
                        <TableCell className="flex"><span className="me-4">{iconsConfig[rol.icono]}</span>{rol.nombre}</TableCell>
                        <TableCell>{rol.descripcion}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}