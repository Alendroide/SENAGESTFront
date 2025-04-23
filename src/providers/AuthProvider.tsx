import { Auth } from "@/types/Auth";
import { JwtPayload, User } from "@/types/User";
import { jwtDecode } from "jwt-decode";
import { Module } from "@/types/Module";
import { useContext, useEffect, useState, createContext } from "react";

const AuthContext = createContext<Auth | null>(null);

export const AuthData = () => useContext(AuthContext) as Auth;

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User>({
        isAuthenticated: false,
        sub: null,
        identificacion: null,
        nombre: null,
        correo: null,
        img: null,
        rol: null
    });

    const [modules, setModules] = useState<Module[]>([])

      //En caso de que se haya iniciado sesión previamente
      useEffect(()=>{
        const token = localStorage.getItem('token') ?? null;
      
        if(token) {
          const payload : JwtPayload = jwtDecode(token);
          setUser({
            isAuthenticated : true,
            sub : payload.sub,
            identificacion : payload.identificacion,
            nombre : payload.nombre,
            correo : payload.correo,
            img : payload.img ?? null,
            rol : payload.rol ?? null
          });
          setModules(payload.modulos);
        }
      },[])

    return (
        <AuthContext.Provider value={{user,setUser,modules,setModules}}>
            {children}
        </AuthContext.Provider>
    )
}