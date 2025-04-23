import ModulesPage from "@/pages/modulePages/modules";

export type RoutesConfig = typeof routesConfig;

export const routesConfig : Record<string, JSX.Element> = {
    "modulos" : <ModulesPage/>,
}