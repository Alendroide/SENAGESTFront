import ModulesPage from "@/pages/modulePages/modulos/ListarModules";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos/list" : <ModulesPage/>,
}