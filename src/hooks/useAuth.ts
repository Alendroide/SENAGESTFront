import { axiosAPI } from "@/api/axiosAPI";
import { AuthData } from "@/providers/AuthProvider";
import { Auth } from "@/types/Auth";
import { Login, LoginResponse } from "@/types/Login";
import { addToast } from '@heroui/toast';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { User } from "@/types/User";

export default function useAuth(){

    const navigate = useNavigate();
    const { setUser } = AuthData() as Auth;

    async function login( loginData : Login){
        try{
            const { data } = await axiosAPI.post<Partial<LoginResponse>>('auth/login',{
                correo : loginData.correo,
                contrasena : loginData.contrasena
            });

            const token = data.access_token;
            
            //De no haber retornado un token, lanzar error
            if(!token) throw new Error("Error iniciando sesión");

            //Token en localStorage
            localStorage.setItem('token',`${token}`);

            //Definición del usuario en el contexto
            const payload : User = jwtDecode(token);
            setUser({
                isAuthenticated : true,
                sub : payload.sub,
                identificacion : payload.identificacion,
                nombre : payload.nombre,
                correo : payload.correo,
                img : payload.img ?? null,
                rol : payload.rol ?? null
            })

            //Retorno al inicio
            navigate('/');
        }
        catch(error : any){
            const message = error.response.data.message ?? null;
            const status = error.status ?? null;
            if(message && status){
                addToast({
                    title : `${status}`,
                    description : `${message}`,
                    color : "danger"
                });
            }
            else {
                console.log(error);
            }
        }
    }

    return { login }
}