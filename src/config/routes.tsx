import CrearModulePage from "@/pages/modulePages/modulos/CrearModulePage";
import ListarModulesPage from "@/pages/modulePages/modulos/ListarModulesPage";
import AsignPermisoPage from "@/pages/modulePages/permisos/AsignPermisoPage";
import CrearPermisoPage from "@/pages/modulePages/permisos/CrearPermisoPage";
import ListarPermisosPage from "@/pages/modulePages/permisos/ListarPermisosPage";
import CrearRolesPage from "@/pages/modulePages/roles/CrearRolesPage";
import ListarRolesPage from "@/pages/modulePages/roles/ListarRolesPage";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/list" : <ListarModulesPage/>,
    "modulos/create" : <CrearModulePage/>,
    "permisos/list" : <ListarPermisosPage/>,
    "permisos/create" : <CrearPermisoPage/>,
    "permisos/asign" : <AsignPermisoPage/>,
    "roles/list" : <ListarRolesPage/>,
    "roles/create" : <CrearRolesPage/>
}