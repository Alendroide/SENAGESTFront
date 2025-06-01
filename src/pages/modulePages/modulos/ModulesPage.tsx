import ModulesTable from "./components/ModulesTable";
import { Button } from "@heroui/button";
import ModulesForm from "./components/ModulesForm";
import PageTitle from "@/components/atoms/PageTitle";
import CustomModal from "@/components/organisms/CustomModal";
import { useDisclosure } from "@heroui/modal";
import usePermissions from "@/hooks/auth/usePermissions";

export default function ModulesPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <PageTitle>Modulos</PageTitle>

      {hasPermission(1) && (
        <Button
          onPress={onOpen}
          className="my-4"
          color="success"
          variant="bordered"
        >
          + Crear Módulo
        </Button>
      )}

      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Crear módulo"
      >
        <ModulesForm />
      </CustomModal>

      <ModulesTable />
    </>
  );
}
