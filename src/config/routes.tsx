import CrearModulePage from "@/pages/modulePages/modulos/CrearModulePage";
import ListarModulesPage from "@/pages/modulePages/modulos/ListarModulesPage";
import ListarPermisosPage from "@/pages/modulePages/permisos/ListarPermisosPage";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/list" : <ListarModulesPage/>,
    "modulos/create" : <CrearModulePage/>,
    "permisos/list" : <ListarPermisosPage/>,
}