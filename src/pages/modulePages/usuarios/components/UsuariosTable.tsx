import useUsuario from "@/hooks/default/useUsuario";
import { Usuario as IncompleteUsuario } from "@/types/modules/Usuario";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

type Usuario = IncompleteUsuario & {id: number, img: string};

export default function UsuariosTable() {
  const { users, isLoading, isError, error, setPage, totalPages } =
    useUsuario();

  return (
    <>
      <Table aria-label="UsuariosTable">
        <TableHeader>
          <TableColumn>Foto</TableColumn>
          <TableColumn>Identificación</TableColumn>
          <TableColumn>Nombre completo</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Ficha</TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5}>Cargando...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={5}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {users?.map((user: Usuario) => {
            const apiURL = import.meta.env.VITE_API_URL
            return(
              <TableRow key={user.id}>
                <TableCell><img src={`${apiURL}uploads/${user.img}`} alt="Foto de perfil" className="w-10 h-10 rounded-full" /></TableCell>
                <TableCell>{user.identificacion}</TableCell>
                <TableCell>
                  {user.primerNombre} {user.segundoNombre ?? ""}{" "}
                  {user.primerApellido} {user.segundoApellido ?? ""}
                </TableCell>
                <TableCell>{user.correo}</TableCell>
                <TableCell>{user.fichaId}</TableCell>
              </TableRow>
          )})}
          
        </TableBody>
      </Table>
      <Pagination
        onChange={(val) => setPage(val)}
        variant="bordered"
        color="success"
        showControls
        initialPage={1}
        total={totalPages}
        className="my-6"
      />
    </>
  );
}
