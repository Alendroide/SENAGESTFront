import CrearModulePage from "@/pages/modulePages/modulos/CrearModulePage";
import ListarModulesPage from "@/pages/modulePages/modulos/ListarModules";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/list" : <ListarModulesPage/>,
    "modulos/create" : <CrearModulePage/>,
}