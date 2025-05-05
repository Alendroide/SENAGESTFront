import ErrorMessage from "@/components/atoms/text/ErrorMessage";
import { iconsConfig, typeIcons } from "@/config/icons";
import useModule from "@/hooks/default/useModule";
import usePermiso from "@/hooks/default/permisos/usePermiso";
import { Module } from "@/types/modules/Module";
import { PermisoSchema } from "@/types/modules/Permiso";
import { Button, Divider, Form, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PermisosForm() {

    const { modules } = useModule();

    const { createPermiso } = usePermiso();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(PermisoSchema)
    })

    return (
        <Form onSubmit={handleSubmit(createPermiso)}>

            <Select
                // Encuentra el ícono del módulo
                startContent={iconsConfig[modules?.find((module: Module & { id: number }) => module.id === watch("moduloId"))?.icono] || ""}
                {...register("moduloId")}
                onChange={(e) => setValue("moduloId", parseInt(e.target.value))}
                label="Modulo"
            >
                {modules?.map((module: Module & { id: number }) => (
                    <SelectItem key={module.id} startContent={iconsConfig[module.icono]}>{module.nombre}</SelectItem>
                ))}
            </Select>
            {errors.moduloId && <ErrorMessage>{errors.moduloId.message}</ErrorMessage>}

            <Select startContent={typeIcons[watch("tipo")] || ""} {...register("tipo")} label="Tipo">
                <SelectItem startContent={typeIcons["read"]} key={'read'}>Lectura</SelectItem>
                <SelectItem startContent={typeIcons["write"]} key={'write'}>Escritura</SelectItem>
                <SelectItem startContent={typeIcons["update"]} key={'update'}>Actualización</SelectItem>
            </Select>
            {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}

            <Input {...register("nombre")} label="Nombre" />
            {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}

            <Textarea {...register("descripcion")} label="Descripción" />
            {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}

            <Divider className="my-4" />

            <p className="text-xl font-semibold">Ruta</p>

            <Input {...register("rutaRuta")} label="Ruta" />
            {errors.rutaRuta && <ErrorMessage>{errors.rutaRuta.message}</ErrorMessage>}

            <Input {...register("rutaNombre")} label="Nombre" />
            {errors.rutaNombre && <ErrorMessage>{errors.rutaNombre.message}</ErrorMessage>}

            <Button className="my-4" type="submit" color="success" variant="bordered">Crear</Button>

        </Form>
    )
}