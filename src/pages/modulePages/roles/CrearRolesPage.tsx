import FormCard from "@/components/atoms/FormCard";
import RolesForm from "./components/RolesForm";

export default function CrearRolesPage(){
    return(
        <div>
            <h1 className="text-2xl font-bold my-4">Crear rol</h1>
            <FormCard>
                <RolesForm/>
            </FormCard>
        </div>
    )
}