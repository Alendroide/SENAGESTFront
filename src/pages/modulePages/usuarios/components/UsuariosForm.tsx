import { UsuarioSchema, Usuario } from "@/types/modules/Usuario";
import ErrorMessage from "@/components/atoms/text/ErrorMessage";
import { Button, Form, Input, useModalContext } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useUsuarios from "@/hooks/default/useUsuario";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function UsuariosForm() {
  const { createUser } = useUsuarios();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Usuario>({
    resolver: zodResolver(UsuarioSchema),
  });

  const { onClose } = useModalContext();

  const onSubmit = async (data: Usuario) => {
    data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    await createUser(formData);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      {/* Imagen */}
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2 my-3">
          <label htmlFor="image-upload" className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-all relative overflow-hidden bg-gray-50" >
            {preview ? (
              <img src={preview} alt="preview" className="object-cover w-full h-full rounded-full" />
            ) : (
              <Plus className="w-8 h-8 text-gray-400" />
            )}
          </label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          {errors.img && <ErrorMessage>{String(errors.img.message)}</ErrorMessage>}
        </div>
      </div>

      <Input {...register("identificacion", { valueAsNumber: true })} label="Identificación" />
      {errors.identificacion && <ErrorMessage>{errors.identificacion.message}</ErrorMessage>}

      <div className="flex w-full">
        <Input {...register("primerNombre")} label="Primer Nombre" />
        <Input {...register("segundoNombre")} label="Segundo Nombre (opcional)" />
      </div>
        {errors.primerNombre && <ErrorMessage>{errors.primerNombre.message}</ErrorMessage>}
        {errors.segundoNombre && <ErrorMessage>{errors.segundoNombre.message}</ErrorMessage>}

      <div className="flex w-full">
        <Input {...register("primerApellido")} label="Primer Apellido" />
        <Input {...register("segundoApellido")} label="Segundo Apellido (opcional)" />
      </div>
        {errors.primerApellido && <ErrorMessage>{errors.primerApellido.message}</ErrorMessage>}
        {errors.segundoApellido && <ErrorMessage>{errors.segundoApellido.message}</ErrorMessage>}

      <Input {...register("correo")} label="Correo Electrónico" />
      {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}

      <Input {...register("contrasena")} label="Contraseña" type="password" />
      {errors.contrasena && <ErrorMessage>{errors.contrasena.message}</ErrorMessage>}

      <Input {...register("fechaNacimiento")} labelPlacement="outside" label="Fecha de Nacimiento" type="date" />
      {errors.fechaNacimiento && <ErrorMessage>{errors.fechaNacimiento.message}</ErrorMessage>}

      <Input {...register("fichaId", { valueAsNumber: true })} label="Ficha ID" />
      {errors.fichaId && <ErrorMessage>{errors.fichaId.message}</ErrorMessage>}

      <div className="flex ms-auto gap-4">
        <Button type="button" color="danger" variant="light" onPress={onClose}>
          Cancelar
        </Button>

        <Button type="submit" color="success" className="text-white">
          Crear
        </Button>
      </div>
    </Form>
  );
}
