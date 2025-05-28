import ListarModulesPage from "@/pages/modulePages/modulos/ListarModulesPage";
import AsignPermisoPage from "@/pages/modulePages/permisos/AsignPermisoPage";
import ListarPermisosPage from "@/pages/modulePages/permisos/ListarPermisosPage";
import ListarRolesPage from "@/pages/modulePages/roles/ListarRolesPage";
import ListarUsuariosPage from "@/pages/modulePages/usuarios/ListarUsuariosPage";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/home" : <ListarModulesPage/>,
    "permisos/home" : <ListarPermisosPage/>,
    "permisos/asign" : <AsignPermisoPage/>,
    "roles/home" : <ListarRolesPage/>,
    "usuarios/home" : <ListarUsuariosPage/>,
}