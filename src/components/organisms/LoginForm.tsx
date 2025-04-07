
//Components
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import Title from '../atoms/text/Title';
import BigCard from '../atoms/BigCard';

//FormLogic
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Login, LoginSchema } from '@/types/Login';
import useAuth from '@/hooks/useAuth';

export default function LoginForm(){

    const { login } = useAuth();
    const { handleSubmit, formState : { errors }, register } = useForm<Login>({resolver : zodResolver(LoginSchema)});

    return(
        <div className='md:w-1/2 mx-auto'>
        <BigCard>
            <Title>Log In</Title>
            <form onSubmit={handleSubmit(login)} className='space-y-4'>
                <Input
                    {...register('correo')}
                    label="Correo"
                />
                {errors?.correo && <p className='text-red-600'>{errors.correo.message}</p>}
                <Input
                    {...register('contrasena')}
                    label="Contraseña"
                    type='password'
                    />
                {errors?.contrasena && <p className='text-red-600'>{errors.contrasena.message}</p>}
                <Button type='submit' color='success' variant='bordered'>Log In</Button>
            </form>
        </BigCard>
        </div>
    )
}