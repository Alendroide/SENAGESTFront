import z from 'zod';
import { Modulo } from './Modulo';

export const LoginSchema = z.object({
    correo : z.string().email("Ingrese un correo válido"),
    contrasena : z.string().min(8,"La contraseña debe tener mínimo 8 caracteres")
})

export type Login = z.infer<typeof LoginSchema>

export type LoginResponse = {
    access_token : string;
    message : string;
    status : number;
    error : string | undefined;
    modulos : Modulo[] | undefined
}