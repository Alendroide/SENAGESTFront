import FormCard from "@/components/atoms/FormCard";
import UsuariosForm from "./components/UsuariosForm";

export default function CrearUsuarioPage() {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Crear Usuario</h1>
      <FormCard>
        <UsuariosForm/>
      </FormCard>
    </>
  );
}
