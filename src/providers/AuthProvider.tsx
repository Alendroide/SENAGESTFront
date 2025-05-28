import { Auth } from "@/types/default/Auth";
import { JwtPayload, User } from "@/types/default/User";
import { jwtDecode } from "jwt-decode";
import { Modulo } from "@/types/default/Modulo";
import { useContext, useEffect, useState, createContext } from "react";

const AuthContext = createContext<Auth | null>(null);
export const AuthData = () => useContext(AuthContext) as Auth;

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    // Inicialización de variables de autorización
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [modules, setModules] = useState<Modulo[]>([])

    // En caso de que se haya iniciado sesión previamente
    useEffect(()=>{
      const token = localStorage.getItem('token') ?? null;
    
      if(token) {
        const payload : JwtPayload = jwtDecode(token);
        
        setIsAuthenticated(true);

        setUser({
          sub : payload.sub,
          identificacion : payload.identificacion,
          nombre : payload.nombre,
          correo : payload.correo,
          img : payload.img,
          rol : payload.rol ?? undefined
        });
        
        setModules(payload.modulos);
      }

    },[])

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser, modules, setModules}}>
            {children}
        </AuthContext.Provider>
    )
}