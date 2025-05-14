import useUsuario from "@/hooks/default/useUsuario";
import { Usuario } from "@/types/modules/Usuario";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function UsuariosTable(){

    const {users, isLoading, isError, error, setPage, pages } = useUsuario();


    return(
        <>
            <Pagination onChange={(val) => setPage(val)} variant="bordered" color="success" showControls initialPage={1} total={pages} className="my-6"/>
            <Table aria-label="UsuariosTable">
                <TableHeader>
                    <TableColumn>Identificación</TableColumn>
                    <TableColumn>Nombre completo</TableColumn>
                    <TableColumn>Correo</TableColumn>
                </TableHeader>
                <TableBody>
                    {isLoading && <TableRow><TableCell colSpan={3}>Cargando...</TableCell></TableRow>}
                    {isError && <TableRow><TableCell colSpan={3}>Error: {error?.message}</TableCell></TableRow>}
                    {users?.map((user : Usuario) => 
                        <TableRow key={user.identificacion}>
                            <TableCell>{user.identificacion}</TableCell>
                            <TableCell>{user.primerNombre} {user.segundoNombre ?? ""} {user.primerApellido} {user.segundoApellido ?? ""}</TableCell>
                            <TableCell>{user.correo}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}