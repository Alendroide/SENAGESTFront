import ErrorMessage from "@/components/atoms/text/ErrorMessage";
import { iconsConfig } from "@/config/icons";
import useModule from "@/hooks/default/useModule";
import { ModuleSchema } from "@/types/modules/Module";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ModulesForm(){

    const {createModule} = useModule();

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver : zodResolver(ModuleSchema)
    });

    return(
        <Form onSubmit={handleSubmit(createModule)}>

            <Input {...register("nombre")} label='Nombre' />
            {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}

            <Input {...register("descripcion")} label='Descripcion' />
            {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}

            <Select {...register("icono")} label="Icono">
                {Object.entries(iconsConfig).map(([key,Icon]) => (
                    <SelectItem key={key}>
                        {Icon}{key}
                    </SelectItem>
                ))}
            </Select>

            {errors.icono && <ErrorMessage>{errors.icono.message}</ErrorMessage>}

            <Button type="submit" color="success" variant="bordered">Crear</Button>
        </Form>
    )
}