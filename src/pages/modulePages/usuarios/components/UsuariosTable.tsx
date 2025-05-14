import useUsuario from "@/hooks/default/useUsuario";
import { Usuario } from "@/types/modules/Usuario";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function UsuariosTable(){

    const {users, isLoading, isError, error, setPage} = useUsuario();

    return(
        <Table aria-label="UsuariosTable">
            <TableHeader>
                <TableColumn>Identificación</TableColumn>
                <TableColumn>Nombre completo</TableColumn>
                <TableColumn>Correo</TableColumn>
            </TableHeader>
            <TableBody>
                {users?.map((user : Usuario) => 
                    <TableRow>
                        <TableCell>{user.identificacion}</TableCell>
                        <TableCell>{user.primerNombre} {user.segundoNombre} {user.primerApellido} {user.segundoApellido}</TableCell>
                        <TableCell>{user.correo}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}