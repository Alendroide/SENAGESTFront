import { z } from "zod";

export const RolSchema = z.object({
    nombre : z.string({required_error:"Ingrese un nombre"}).min(3,"Mínimo 3 caracteres").max(20,"Máximo 20 caracteres"),
    descripcion: z.string({required_error:"Ingrese una descripción"}).min(10,"Mínimo 10 caracteres").max(255,"Máximo 255 caracteres"),
    icono : z.string({required_error:"Seleccione un ícono"})
})

export type Rol = z.infer<typeof RolSchema>