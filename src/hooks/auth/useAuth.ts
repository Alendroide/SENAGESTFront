import { axiosAPI } from "@/api/axiosAPI";
import { AuthData } from "@/providers/AuthProvider";
import { Login, LoginResponse } from "@/types/default/Login";
import { addToast } from '@heroui/toast';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "@/types/default/User";

export default function useAuth(){

    const navigate = useNavigate();
    const { setUser, setModules } = AuthData();

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
            const payload : JwtPayload = jwtDecode(token);
            setUser({
                isAuthenticated : true,
                sub : payload.sub,
                identificacion : payload.identificacion,
                nombre : payload.nombre,
                correo : payload.correo,
                img : payload.img ?? null,
                rol : payload.rol ?? null
            })

            setModules(payload.modulos);

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

    async function logout(){
        localStorage.removeItem('token');
        setUser({isAuthenticated : false, sub : null, identificacion : null, nombre : null, correo : null, img : null, rol : null});
        setModules([]);
        navigate('/');
    }

    return { login, logout }
}