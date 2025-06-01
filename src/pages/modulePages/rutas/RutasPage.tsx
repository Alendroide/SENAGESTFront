import PageTitle from "@/components/atoms/PageTitle";
import RutasTable from "./components/RutasTable";
import usePermissions from "@/hooks/auth/usePermissions";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import CustomModal from "@/components/organisms/CustomModal";
import RutasForm from "./components/RutasForm";

export default function RutasPage(){

    const {hasPermission} = usePermissions();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return(
        <>
            <PageTitle>Rutas</PageTitle>

            {hasPermission(18) && (
                <Button
                    className="mt-4"
                    color="success"
                    variant="bordered"
                    onPress={onOpen}
                >
                    + Crear Ruta
                </Button>
            )}

            <CustomModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                title="Crear ruta"
            >
                <RutasForm/>
            </CustomModal>

            <RutasTable/>
        </>
    )
}