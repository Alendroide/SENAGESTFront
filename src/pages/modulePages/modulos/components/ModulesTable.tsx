import { iconsConfig } from "@/config/icons";
import useModulo from "@/hooks/default/useModulo";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export default function ModulesTable() {
  const { modules, isLoading, isError, error, totalPages, setPage } = useModulo();
  return (
    <>
      <Table aria-label="ModulesTable">
        <TableHeader>
          <TableColumn>Ícono</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Descripción</TableColumn>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={3}>Cargando...</TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={3}>Error: {error?.message}</TableCell>
            </TableRow>
          )}
          {modules?.map((module: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{iconsConfig[module.icono]}</TableCell>
              <TableCell>{module.nombre}</TableCell>
              <TableCell>{module.descripcion}</TableCell>
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
