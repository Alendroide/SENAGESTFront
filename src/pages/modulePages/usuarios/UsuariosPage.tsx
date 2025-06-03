import PageTitle from "@/components/atoms/PageTitle";
import UsuariosTable from "./components/UsuariosTable";
import { useDisclosure } from "@heroui/modal";
import CustomModal from "@/components/organisms/CustomModal";
import UsuariosForm from "./components/UsuariosForm";
import usePermissions from "@/hooks/auth/usePermissions";
import CustomButton from "@/components/atoms/CustomButton";

export default function UsuariosPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      {hasPermission(14) && (
        <CustomButton
          onPress={onOpen}
        >
          + Crear Usuario
        </CustomButton>
      )}

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear usuario"
      >
        <UsuariosForm />
      </CustomModal>

      <UsuariosTable />
    </>
  );
}
