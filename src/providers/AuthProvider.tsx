import { Auth } from "@/types/default/Auth";
import { JwtPayload, User } from "@/types/default/User";
import { jwtDecode } from "jwt-decode";
import { Modulo, Permiso } from "@/types/default/Modulo";
import { useContext, useEffect, useState, createContext } from "react";
import Cookies from 'universal-cookie';

const AuthContext = createContext<Auth | null>(null);
export const AuthData = () => useContext(AuthContext) as Auth;

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const cookies = new Cookies();

    // Inicialización de variables de autorización
    const [appLoading, setAppLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [modules, setModules] = useState<Modulo[]>([]);
    const [permissions, setPermissions] = useState<Permiso[]>([]);

    // En caso de que se haya iniciado sesión previamente
    useEffect(()=>{
      const token = cookies.get('token') ?? null;
      const modules = cookies.get('modules') || [];
      const permissions = cookies.get('permissions') || [];
    
      if(token) {
        const payload = jwtDecode<JwtPayload>(token);
        
        setIsAuthenticated(true);

        setUser({
          sub : payload.sub,
          identificacion : payload.identificacion,
          nombre : payload.nombre,
          correo : payload.correo,
          img : payload.img,
          rol : payload.rol ?? undefined
        });
        
        setModules(modules);

        setPermissions(permissions);
        setAppLoading(false);
      }
      
    },[])

    return (
        <AuthContext.Provider value={{appLoading, isAuthenticated, setIsAuthenticated, user, setUser, modules, setModules, permissions, setPermissions}}>
            {children}
        </AuthContext.Provider>
    )
}