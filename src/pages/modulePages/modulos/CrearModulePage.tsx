import DefaultLayout from "@/layouts/default";
import ModulesForm from "./components/ModulesForm";

export default function CrearModulePage(){
    return(
        <DefaultLayout>
            <h1 className="text-2xl font-bold my-4">Crear Modulo</h1>
            <ModulesForm/>
        </DefaultLayout>
    )
}