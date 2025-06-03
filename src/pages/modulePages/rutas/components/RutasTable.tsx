import { iconsConfig } from "@/config/icons";
import useRuta from "@/hooks/default/useRuta";
import { Module } from "@/types/modules/Module";
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

type Ruta = {
  id: number;
  nombre: string;
  ruta: string;
};

export default function PermisosTable() {
  const {
    moduleWithRutas: modulo,
    isLoading,
    isError,
    error,
    setPage,
    totalPages,
    modules,
    selectedModule,
    setSelectedModule,
  } = useRuta();

  return (
    <>
      <div className="flex gap-4 my-6 w-1/4">
          {modules && (
            <Select
              aria-label="moduleSelector"
              defaultSelectedKeys={[`${selectedModule}`]}
              onChange={(e) => setSelectedModule(parseInt(e.target.value))}
              startContent={iconsConfig[modules.find((module: Module) => module.id === selectedModule)?.icono as string] || ""}
              placeholder="Seleccione..."
            >
              {modules.map((module: Module) => (
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
                <TableColumn>Ruta</TableColumn>
              </TableHeader>
              <TableBody>
                {modulo.rutas?.length ? (
                  modulo.rutas.map((ruta: Ruta) => (
                      <TableRow key={ruta.id}>
                      <TableCell><div className="flex items-center gap-4">{iconsConfig[modulo.icono]}{ruta.nombre}</div></TableCell>
                      <TableCell>baseURL/{(modulo.nombre as string).toLowerCase()}/{ruta.ruta}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="no-permisos">
                    <TableCell colSpan={2}>
                      No hay rutas disponibles
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
