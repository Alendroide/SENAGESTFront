import PageTitle from "@/components/atoms/PageTitle";
import RolesTable from "./components/RolesTable";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import CustomModal from "@/components/organisms/CustomModal";
import RolesForm from "./components/RolesForm";
import usePermissions from "@/hooks/auth/usePermissions";

export default function RolesPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PageTitle>Roles</PageTitle>
      {hasPermission(10) && (
        <Button
          onPress={onOpen}
          className="my-4"
          color="success"
          variant="bordered"
        >
          + Crear Rol
        </Button>
      )}

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear rol"
      >
        <RolesForm />
      </CustomModal>

      <RolesTable />
    </>
  );
}
