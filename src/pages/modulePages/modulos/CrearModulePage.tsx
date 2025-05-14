import FormCard from "@/components/atoms/FormCard";
import ModulesForm from "./components/ModulesForm";

export default function CrearModulePage(){
    return(
        <>
            <h1 className="text-2xl font-bold my-4">Crear Modulo</h1>
            <FormCard>
                <ModulesForm/>
            </FormCard>
        </>
    )
}