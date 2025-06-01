import { axiosAPI } from "@/api/axiosAPI";
import { AuthData } from "@/providers/AuthProvider";
import { Login, LoginResponse } from "@/types/default/Login";
import { addToast } from '@heroui/toast';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "@/types/default/User";
import Cookies from 'universal-cookie';

export default function useAuth(){

    const cookies = new Cookies();

    const navigate = useNavigate();
    const { setIsAuthenticated, setUser, setModules } = AuthData();

    async function login( loginData : Login){
        try{
            const { data } = await axiosAPI.post<Partial<LoginResponse>>('auth/login',{
                correo : loginData.correo,
                contrasena : loginData.contrasena
            });

            const token = data.access_token;
            if(!token) throw new Error("Error iniciando sesión");

            const modules = data.modulos ?? [];

            // Token en Cookies
            cookies.set('token',token);
            const payload : JwtPayload = jwtDecode(token);

            // Modules en Cookies
            cookies.set('modules',modules);

            setIsAuthenticated(true);
            setUser({
                sub : payload.sub,
                identificacion : payload.identificacion,
                nombre : payload.nombre,
                correo : payload.correo,
                img : payload.img,
                rol : payload.rol ?? undefined
            })
            setModules(modules);

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
        cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
        setModules([]);
        navigate('/');
    }

    return { login, logout }
}