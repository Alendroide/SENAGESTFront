import PageTitle from "@/components/atoms/PageTitle";
import PermisosTable from "./components/PermisosTable";
import { AuthData } from "@/providers/AuthProvider";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import PermisosForm from "./components/PermisosForm";

export default function PermisosPage() {

const { modules } = AuthData();

  const pagePermisos = modules
    ?.flatMap((module) => module.rutas)
    ?.find((ruta) => ruta.id === 2)?.permisos;

  const crearPermiso = pagePermisos?.find((permiso) => permiso.id === 5);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <PageTitle>Permisos</PageTitle>
            {crearPermiso && <Button onPress={onOpen} className="my-4" color="success" variant="bordered">+ Crear Permiso</Button>}

            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title="Crear permiso">
                <PermisosForm/>
            </CustomModal>

            <PermisosTable/>
        </>
    );
}