import { AuthData } from "@/providers/AuthProvider";
import ModulesTable from "./components/ModulesTable";
import { Button } from "@heroui/button";

export default function ModulesPage() {
  const { modules } = AuthData();

  const pagePermisos = modules
    ?.flatMap((module) => module.rutas)
    ?.find((ruta) => ruta.id === 1)?.permisos;
    console.log(pagePermisos)

  const crearPermiso = pagePermisos?.find((permiso) => permiso.id === 1);

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Modulos</h1>
      {crearPermiso && <Button>Crear Módulo</Button>}
      <ModulesTable />
    </>
  );
}
