import { iconsConfig } from "@/config/icons";
import useModule from "@/hooks/default/useModule";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function ModulesTable(){
    const {modules} = useModule();
    return(
        <Table aria-label="ModulesTable">
            <TableHeader>
                <TableColumn>Ícono</TableColumn>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Descripción</TableColumn>
            </TableHeader>
            <TableBody>
                {modules && modules.map( ( module : any, index : number ) =>
                    <TableRow key={index}>
                        <TableCell>{iconsConfig[module.icono]}</TableCell>
                        <TableCell>{module.nombre}</TableCell>
                        <TableCell>{module.descripcion}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}