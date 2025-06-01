import { axiosAPI } from "@/api/axiosAPI";
import { AuthData } from "@/providers/AuthProvider";
import { Login, LoginResponse } from "@/types/default/Login";
import { addToast } from '@heroui/toast';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "@/types/default/User";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function useAuth(){


    const navigate = useNavigate();
    const { setIsAuthenticated, setUser, setModules, setPermissions } = AuthData();

    async function login( loginData : Login){
        try{
            const { data } = await axiosAPI.post<Partial<LoginResponse>>('auth/login',{
                correo : loginData.correo,
                contrasena : loginData.contrasena
            });

            const token = data.access_token;
            if(!token) throw new Error("Error iniciando sesión");

            const payload : JwtPayload = jwtDecode(token);
            const modules = data.modulos ?? [];
            const permissions = modules.flatMap((module) => module.rutas).flatMap((ruta) => ruta.permisos) || [];

            // Token en Cookies
            cookies.set('token',token);

            // Modules en Cookies
            cookies.set('modules',modules);

            // Permissions en Cookies
            cookies.set('permissions',permissions);

            setIsAuthenticated(true);
            setUser(payload);
            setModules(modules);
            setPermissions(permissions);

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
        cookies.remove('modules');
        cookies.remove('permissions');
        setIsAuthenticated(false);
        setUser(null);
        setModules([]);
        setPermissions([]);
        navigate('/');
    }

    return { login, logout }
}