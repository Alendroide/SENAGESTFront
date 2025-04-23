import z from 'zod';

export const ModuleSchema = z.object({
    nombre : z.string().min(3,"Name must be longer than 3 chars"),
    descripcion : z.string().min(10,"Description must be longer than 10 chars"),
    icono : z.string().optional()
})

export type Module = z.infer<typeof ModuleSchema>