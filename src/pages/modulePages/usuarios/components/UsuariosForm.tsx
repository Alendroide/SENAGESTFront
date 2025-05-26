import { UsuarioSchema, Usuario } from "@/types/modules/Usuario";
import ErrorMessage from "@/components/atoms/text/ErrorMessage";
import { addToast, Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useUsuarios from "@/hooks/default/useUsuario";
import { useNavigate } from "react-router-dom";

export default function UsuariosForm() {
  const { createUser } = useUsuarios();
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Usuario>({
    resolver: zodResolver(UsuarioSchema),
  });

  const onSubmit = async (data: Usuario) => {

    data.fechaNacimiento = new Date(data.fechaNacimiento).toISOString();

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    try {
      await createUser(formData);
      addToast({
        title: "Usuario creado",
        description: "El usuario fue creado exitosamente",
        color: "success"
      });
      navigate("/usuarios/list");
    } catch (error) {
      console.error("Error al crear usuario", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <Input {...register("identificacion", { valueAsNumber: true })} label="Identificación" />
      {errors.identificacion && <ErrorMessage>{errors.identificacion.message}</ErrorMessage>}

      <Input {...register("primerNombre")} label="Primer Nombre" />
      {errors.primerNombre && <ErrorMessage>{errors.primerNombre.message}</ErrorMessage>}

      <Input {...register("segundoNombre")} label="Segundo Nombre (opcional)" />
      {errors.segundoNombre && <ErrorMessage>{errors.segundoNombre.message}</ErrorMessage>}

      <Input {...register("primerApellido")} label="Primer Apellido" />
      {errors.primerApellido && <ErrorMessage>{errors.primerApellido.message}</ErrorMessage>}

      <Input {...register("segundoApellido")} label="Segundo Apellido (opcional)" />
      {errors.segundoApellido && <ErrorMessage>{errors.segundoApellido.message}</ErrorMessage>}

      <Input {...register("correo")} label="Correo Electrónico" />
      {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}

      <Input {...register("contrasena")} label="Contraseña" type="password" />
      {errors.contrasena && <ErrorMessage>{errors.contrasena.message}</ErrorMessage>}

      <Input {...register("fechaNacimiento")} labelPlacement="outside" label="Fecha de Nacimiento" type="date" />
      {errors.fechaNacimiento && <ErrorMessage>{errors.fechaNacimiento.message}</ErrorMessage>}

      <Input {...register("fichaId", { valueAsNumber: true })} label="Ficha ID" />
      {errors.fichaId && <ErrorMessage>{errors.fichaId.message}</ErrorMessage>}

      {/* Imagen */}
      <Input
        label="Imagen"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setValue("img", file, { shouldValidate: true });
          }
        }}
      />
      {errors.img && <ErrorMessage>{String(errors.img.message)}</ErrorMessage>}

      <Button type="submit" color="success" variant="bordered">
        Crear Usuario
      </Button>
    </Form>
  );
}
