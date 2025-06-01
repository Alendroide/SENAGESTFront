import PageTitle from "@/components/atoms/PageTitle";
import UsuariosTable from "./components/UsuariosTable";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import UsuariosForm from "./components/UsuariosForm";
import usePermissions from "@/hooks/auth/usePermissions";

export default function UsuariosPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      {hasPermission(14) && (
        <Button
          onPress={onOpen}
          className="my-4"
          color="success"
          variant="bordered"
        >
          + Crear Usuario
        </Button>
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
