import PageTitle from "@/components/atoms/PageTitle";
import PermisosTable from "./components/PermisosTable";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import PermisosForm from "./components/PermisosForm";
import usePermissions from "@/hooks/auth/usePermissions";

export default function PermisosPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PageTitle>Permisos</PageTitle>

      {hasPermission(5) && (
        <Button
          onPress={onOpen}
          className="my-4"
          color="success"
          variant="bordered"
        >
          + Crear Permiso
        </Button>
      )}

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear permiso"
      >
        <PermisosForm />
      </CustomModal>

      <PermisosTable />
    </>
  );
}
