import { Auth } from "@/types/default/Auth";
import { JwtPayload, User } from "@/types/default/User";
import { jwtDecode } from "jwt-decode";
import { Modulo } from "@/types/default/Modulo";
import { useContext, useEffect, useState, createContext } from "react";
import Cookies from 'universal-cookie';

const AuthContext = createContext<Auth | null>(null);
export const AuthData = () => useContext(AuthContext) as Auth;

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const cookies = new Cookies();

    // Inicialización de variables de autorización
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [modules, setModules] = useState<Modulo[]>([]);

    // En caso de que se haya iniciado sesión previamente
    useEffect(()=>{
      const token = cookies.get('token') ?? null;
      const modules = cookies.get('modules') || [];
    
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
      }

    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, modules, setModules}}>
            {children}
        </AuthContext.Provider>
    )
}