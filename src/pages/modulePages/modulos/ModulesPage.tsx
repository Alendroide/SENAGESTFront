import { AuthData } from "@/providers/AuthProvider";
import ModulesTable from "./components/ModulesTable";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import ModulesForm from "./components/ModulesForm";

export default function ModulesPage() {
  const { modules } = AuthData();

  const pagePermisos = modules
    ?.flatMap((module) => module.rutas)
    ?.find((ruta) => ruta.id === 1)?.permisos;

  const crearPermiso = pagePermisos?.find((permiso) => permiso.id === 1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <h1 className="text-2xl font-bold mt-6">Modulos</h1>
      {crearPermiso && <Button onPress={onOpen} className="my-4" color="success" variant="bordered">+ Crear Módulo</Button>}
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
            <ModalHeader>
                Crear Módulo
            </ModalHeader>
            <ModalBody>
                <ModulesForm/>
            </ModalBody>
        </ModalContent>
      </Modal>
      
      <ModulesTable />
    </>
  );
}
