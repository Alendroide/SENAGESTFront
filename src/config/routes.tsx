import ModulesPage from "@/pages/modulePages/modulos/ModulesPage";
import AsignPermisoPage from "@/pages/modulePages/permisos/AsignPermisoPage";
import PermisosPage from "@/pages/modulePages/permisos/PermisosPage";
import RolesPage from "@/pages/modulePages/roles/RolesPage";
import UsuariosPage from "@/pages/modulePages/usuarios/UsuariosPage";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/home" : <ModulesPage/>,
    "permisos/home" : <PermisosPage/>,
    "permisos/asign" : <AsignPermisoPage/>,
    "roles/home" : <RolesPage/>,
    "usuarios/home" : <UsuariosPage/>,
}