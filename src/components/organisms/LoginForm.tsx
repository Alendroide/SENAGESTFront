
//Components
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';

//FormLogic
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Login, LoginSchema } from '@/types/default/Login';
import useAuth from '@/hooks/auth/useAuth';
import { Link } from 'react-router-dom';

export default function LoginForm(){

    const { login } = useAuth();
    const { handleSubmit, formState : { errors }, register } = useForm<Login>({resolver : zodResolver(LoginSchema)});

    return(
        <div className='w-11/12 bg-white box-border p-12 rounded-xl border-1 border-solid border-gray-300 mx-auto flex flex-col md:w-2/3'>
            <p className='text-gray-400'>Introduce tus credenciales</p>
            <h1 className='text-3xl font-bold mt-2 mb-8 text-gray-800'>Bienvenido!</h1>
            <form onSubmit={handleSubmit(login)} className='space-y-4'>
                <Input
                    {...register('correo')}
                    label="Correo electrónico"
                />
                {errors?.correo && <p className='text-red-600'>{errors.correo.message}</p>}
                <Input
                    {...register('contrasena')}
                    label="Contraseña"
                    type='password'
                />
                {errors?.contrasena && <p className='text-red-600'>{errors.contrasena.message}</p>}
                <div className='flex justify-end'>
                    <Link to={'/forgot-password'} className='text-blue-600 my-2 font-light'>Olvidaste tu contraseña?</Link>
                </div>
                <div>
                    <Button type='submit' className='bg-blue-900 text-white text-md font-light w-full'>Iniciar sesión</Button>
                </div>
            </form>
        </div>
    )
}