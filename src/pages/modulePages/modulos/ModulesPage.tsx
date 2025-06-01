import ModulesTable from "./components/ModulesTable";
import { Button } from "@heroui/button";
import ModulesForm from "./components/ModulesForm";
import PageTitle from "@/components/atoms/PageTitle";
import CustomModal from "@/components/organisms/CustomModal";
import { useDisclosure } from "@heroui/modal";
import usePermissions from "@/hooks/auth/usePermissions";
import { useState } from "react";
import { Module } from "@/types/modules/Module";
import ModulesUpdateForm from "./components/ModulesUpdateForm";

export default function ModulesPage() {
  const { hasPermission } = usePermissions();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<Module | null>(null);

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
        title={selectedId ? "Editar módulo" : "Crear módulo"}
      >
        {selectedId && selectedData ? 
          <ModulesUpdateForm selectedId={selectedId} selectedData={selectedData} setSelectedId={setSelectedId} setSelectedData={setSelectedData}/>
          :
          <ModulesForm/>
        }

      </CustomModal>

      <ModulesTable onOpen={onOpen} setSelectedId={setSelectedId} setSelectedData={setSelectedData} />
    </>
  );
}
