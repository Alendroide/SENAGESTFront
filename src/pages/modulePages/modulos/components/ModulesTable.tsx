import { iconsConfig } from "@/config/icons";
import usePermissions from "@/hooks/auth/usePermissions";
import useModulo from "@/hooks/default/useModulo";
import { Module } from "@/types/modules/Module";
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
  setSelectedData: React.Dispatch<React.SetStateAction<Module | null>>;
}

export default function ModulesTable({ onOpen, setSelectedId, setSelectedData } : props) {

  const { hasPermission } = usePermissions();
  const { modules, isLoading, isError, error, totalPages, setPage } = useModulo();

  function handleEdit(module: Module & {id: number}){
    setSelectedId(module.id);
    setSelectedData(module);
    onOpen();
  }

  return (
    <>
      <Table aria-label="ModulesTable">
        <TableHeader>
          <TableColumn>Ícono</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripción</TableColumn>
          <TableColumn>
            { (hasPermission(3) || hasPermission(4)) &&
              <>Acciones</>
            }
          </TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={4}>Cargando...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={4}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {modules?.map((module: Module & {id: number}, index: number) => (
            <TableRow key={index}>
              <TableCell>{iconsConfig[module.icono]}</TableCell>
              <TableCell>{module.nombre}</TableCell>
              <TableCell>{module.descripcion}</TableCell>
              <TableCell>
                {hasPermission(3) &&
                  <Pencil onClick={() =>handleEdit(module)} className="p-1 w-8 h-8 border-2 border-solid border-warning-500 rounded-lg text-warning-500 cursor-pointer"/>
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
