import ErrorMessage from "@/components/atoms/text/ErrorMessage";
import usePermiso from "@/hooks/default/usePermiso";
import { Module } from "@/types/modules/Module";
import { AsignPermisoSchema, Permiso } from "@/types/modules/Permiso";
import { Button, Checkbox, Form, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AsignPermisoForm(){

    const { modulesWithPermisos, asignPermiso } = usePermiso();
    
    const { register, handleSubmit, formState : { errors }, setValue } = useForm({
        resolver : zodResolver(AsignPermisoSchema),
        defaultValues : {
            valor : true
        }
    })

    const [moduloId,setModuloId] = useState<number | undefined>(undefined);
    const permisosDisplayed = modulesWithPermisos?.find((modulo : Module & { id: number, permisos: Permiso[]}) => modulo.id === moduloId )?.permisos || [];
    
    return(
        <Form onSubmit={handleSubmit(asignPermiso)}>
            
            <Select onChange={(e) => setModuloId(parseInt(e.target.value))} label="Modulo">
                {modulesWithPermisos?.map((modulo : Module & {id : number})=>(
                    <SelectItem key={modulo.id}>{modulo.nombre}</SelectItem>
                ))}
            </Select>

            {permisosDisplayed.length > 0 &&
                <Select {...register("permisoId")} onChange={(e) => setValue("permisoId",parseInt(e.target.value))} label="Permiso">
                        {
                            permisosDisplayed.map((permiso : Permiso & {id : number}) => (
                                <SelectItem key={permiso.id}>{permiso.nombre}</SelectItem>
                            ))
                        }
                </Select>
            }

            {errors.permisoId && <ErrorMessage>{errors.permisoId.message}</ErrorMessage>}

            <Input {...register("rolId")} type="number" label="Rol"/>
            {errors.rolId && <ErrorMessage>{errors.rolId.message}</ErrorMessage>}
            
            <Checkbox {...register("valor")} />
            {errors.valor && <ErrorMessage>{errors.valor.message}</ErrorMessage>}

            <Button color="success" variant="bordered" type="submit">Asignar</Button>
        </Form>
    )
}