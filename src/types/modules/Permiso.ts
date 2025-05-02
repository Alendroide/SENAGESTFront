import { z } from "zod";

export const PermisoSchema = z.object({
    nombre : z.string().min(3,"Ingrese mínimo 3 caracteres"),
    descripcion : z.string().min(10,"Ingrese mínimo 10 caracteres"),
    tipo : z.string({required_error:"Ingrese un tipo"}).min(1,"Tipo requerido"),
    moduloId : z.number({required_error:"Ingrese un módulo",invalid_type_error:"Ingrese un valor"}),
    rutaRuta : z.string({required_error:"Ingrese una ruta"}).min(4,"Ingrese mínimo 4 caracteres"),
    rutaNombre : z.string({required_error:"Ingrese un nombre para la ruta"}).min(4,"Ingrese mínimo 4 caracteres")
})

export type Permiso = z.infer<typeof PermisoSchema>