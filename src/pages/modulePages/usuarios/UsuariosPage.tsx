import PageTitle from "@/components/atoms/PageTitle";
import UsuariosTable from "./components/UsuariosTable";
import { AuthData } from "@/providers/AuthProvider";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import UsuariosForm from "./components/UsuariosForm";

export default function UsuariosPage() {

    const { modules } = AuthData();

  const pagePermisos = modules
    ?.flatMap((module) => module.rutas)
    ?.find((ruta) => ruta.id === 2)?.permisos;

  const crearPermiso = pagePermisos?.find((permiso) => permiso.id === 5);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <PageTitle>Usuarios</PageTitle>
            {crearPermiso && <Button onPress={onOpen} className="my-4" color="success" variant="bordered">+ Crear Usuario</Button>}

            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title="Crear usuario">
                <UsuariosForm/>
            </CustomModal>

            <UsuariosTable/>
        </>
    )
}