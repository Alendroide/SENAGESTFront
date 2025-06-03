import { iconsConfig } from "@/config/icons";
import usePermissions from "@/hooks/auth/usePermissions";
import useRol from "@/hooks/default/useRol";
import { Rol } from "@/types/modules/Rol";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Pencil } from "lucide-react";

interface props {
  onOpen: () => void;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedData: React.Dispatch<React.SetStateAction<Rol | null>>;
}

export default function RolesTable({
  onOpen,
  setSelectedId,
  setSelectedData,
}: props) {
  const { hasPermission } = usePermissions();

  const { roles, isLoading, isError, error, totalPages, setPage } = useRol();

  function handleEdit(rol: Rol) {
    setSelectedId(rol.id as number);
    setSelectedData(rol);
    onOpen();
  }

  return (
    <>
      <Table aria-label="TablaRoles">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>
            { (hasPermission(12) || hasPermission(13)) &&
              <>Acciones</>
            }
          </TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3}>Cargando todos los roles...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={3}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {roles?.map((rol: Rol) => (
            <TableRow key={rol.id}>
              <TableCell className="flex">
                <span className="me-4">{iconsConfig[rol.icono]}</span>
                {rol.nombre}
              </TableCell>
              <TableCell>{rol.descripcion}</TableCell>
              <TableCell>
                {hasPermission(12) &&
                  <Pencil onClick={() =>handleEdit(rol)} className="p-1 w-8 h-8 border-2 border-solid border-warning-500 rounded-lg text-warning-500 cursor-pointer"/>
                }
              </TableCell>
            </TableRow>
          ))}
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
