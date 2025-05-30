import PageTitle from "@/components/atoms/PageTitle";
import RolesTable from "./components/RolesTable";
import { useDisclosure } from "@heroui/modal";
import { AuthData } from "@/providers/AuthProvider";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import RolesForm from "./components/RolesForm";

export default function RolesPage(){

    const { modules } = AuthData();

    const pagePermisos = modules
    ?.flatMap((module) => module.rutas)
    ?.find((ruta) => ruta.id === 4)?.permisos;

  const crearPermiso = pagePermisos?.find((permiso) => permiso.id === 10);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
            <PageTitle>Roles</PageTitle>
            {crearPermiso && <Button onPress={onOpen} className="my-4" color="success" variant="bordered">+ Crear Rol</Button>}

            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title="Crear rol">
                <RolesForm/>
            </CustomModal>

            <RolesTable/>
        </>
    )
}