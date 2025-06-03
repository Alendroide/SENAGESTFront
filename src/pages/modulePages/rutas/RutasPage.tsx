import PageTitle from "@/components/atoms/PageTitle";
import RutasTable from "./components/RutasTable";
import usePermissions from "@/hooks/auth/usePermissions";
import { useDisclosure } from "@heroui/modal";
import CustomModal from "@/components/organisms/CustomModal";
import RutasForm from "./components/RutasForm";
import CustomButton from "@/components/atoms/CustomButton";

export default function RutasPage(){

    const {hasPermission} = usePermissions();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return(
        <>
            <PageTitle>Rutas</PageTitle>

            {hasPermission(18) && (
                <CustomButton
                    onPress={onOpen}
                >
                    + Crear Ruta
                </CustomButton>
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