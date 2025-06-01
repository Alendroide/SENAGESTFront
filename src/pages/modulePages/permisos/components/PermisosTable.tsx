import { iconsConfig, typeIcons } from "@/config/icons";
import usePermiso from "@/hooks/default/usePermiso";
import { Modulo } from "@/types/default/Modulo";
import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

type Permiso = {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
};

export default function PermisosTable() {
  const {
    moduleWithPermisos: modulo,
    isLoading,
    isError,
    error,
    setPage,
    totalPages,
    modules,
    selectedModule,
    setSelectedModule,
  } = usePermiso();

  return (
    <>
      <div className="flex gap-4 my-6 w-1/4">
          {modules && (
            <Select
              aria-label="moduleSelector"
              defaultSelectedKeys={[`${selectedModule}`]}
              onChange={(e) => setSelectedModule(parseInt(e.target.value))}
              startContent={iconsConfig[modules.find((module: Modulo) => module.id === selectedModule)?.icono as string] || ""}
              placeholder="Seleccione..."
            >
              {modules.map((module: Modulo) => (
                <SelectItem key={module.id} startContent={iconsConfig[module.icono]}>{module.nombre}</SelectItem>
              ))}
            </Select>
          )}

          <Pagination
            onChange={(val) => setPage(val)}
            variant="bordered"
            color="success"
            showControls
            initialPage={1}
            total={totalPages}
          />
      </div>

      {isLoading && <p>Cargando...</p>}
      {isError && !isNaN(selectedModule) && <p>Error: {error?.message}</p>}

      {modulo && !isNaN(selectedModule) && (
        <>
          <div key={modulo.id}>
            <Table aria-label={`Tabla${modulo.nombre}`}>
              <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Descripción</TableColumn>
              </TableHeader>
              <TableBody>
                {modulo.permisos?.length ? (
                  modulo.permisos.map((permiso: Permiso) => (
                    <TableRow key={permiso.id}>
                      <TableCell className="flex gap-2">
                        {typeIcons[permiso.tipo]}
                        {permiso.nombre}
                      </TableCell>
                      <TableCell>{permiso.descripcion}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="no-permisos">
                    <TableCell colSpan={2}>
                      No hay permisos disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
}
