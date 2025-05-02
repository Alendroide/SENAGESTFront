import CrearModulePage from "@/pages/modulePages/modulos/CrearModulePage";
import ListarModulesPage from "@/pages/modulePages/modulos/ListarModulesPage";
import AsignPermisoPage from "@/pages/modulePages/permisos/AsignPermisoPage";
import CrearPermisoPage from "@/pages/modulePages/permisos/CrearPermisoPage";
import ListarPermisosPage from "@/pages/modulePages/permisos/ListarPermisosPage";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/list" : <ListarModulesPage/>,
    "modulos/create" : <CrearModulePage/>,
    "permisos/list" : <ListarPermisosPage/>,
    "permisos/create" : <CrearPermisoPage/>,
    "permisos/asign" : <AsignPermisoPage/>
}