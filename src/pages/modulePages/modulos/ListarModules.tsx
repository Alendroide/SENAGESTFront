import DefaultLayout from "@/layouts/default";
import ModulesTable from "./components/ModulesTable";

export default function ListarModulesPage(){

    

    return(
        <DefaultLayout>
            <h1 className="text-2xl font-bold my-4">Modulos</h1>
            <ModulesTable/>
        </DefaultLayout>
    )
}