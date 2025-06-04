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
import { format } from "date-fns";

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
          <TableColumn>Fecha de nacimiento</TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={6}>Cargando...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={6}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {users?.map((user: Usuario) => {
            const apiURL = import.meta.env.VITE_API_URL
            return(
              <TableRow key={user.id}>
                <TableCell><img src={`${apiURL}uploads/${user.img}`} alt="Foto de perfil" className="w-10 rounded-full aspect-square" /></TableCell>
                <TableCell>{user.identificacion}</TableCell>
                <TableCell>
                  {user.primerNombre} {user.segundoNombre ?? ""}{" "}
                  {user.primerApellido} {user.segundoApellido ?? ""}
                </TableCell>
                <TableCell>{user.correo}</TableCell>
                <TableCell>{user.fichaId}</TableCell>
                <TableCell>{format(user.fechaNacimiento, "dd/MM/yyyy")}</TableCell>
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
