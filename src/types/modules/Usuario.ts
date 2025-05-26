import { z } from "zod";

export const UsuarioSchema = z.object({
    identificacion: z.number({required_error:"Ingrese una identificación"}),
    primerNombre: z.string({required_error:"Ingrese un nombre"}).min(3,"Al menos 3 caractéres").max(20,"Máximo 20 caracteres"),
    segundoNombre: z.string().optional().nullable(),
    primerApellido: z.string({required_error:"Ingrese un nombre"}).min(3,"Al menos 3 caractéres").max(20,"Máximo 20 caracteres"),
    segundoApellido: z.string().optional().nullable(),
    correo: z.string({required_error:"Ingrese un correo"}).email(),
    contrasena: z.string({required_error:"Ingrese una contraseña"}),
    fechaNacimiento: z.string({required_error:"Ingrese una fecha"}),
    fichaId: z.number({required_error:"Ingrese un ID ficha"}),
    img: z.any().refine(file => file instanceof File && file.size > 0,"La imagen es obligatoria")
})

export type Usuario = z.infer<typeof UsuarioSchema>