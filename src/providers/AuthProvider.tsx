import { Auth } from "@/types/Auth";
import { User } from "@/types/User";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState, createContext } from "react";

const AuthContext = createContext<Auth | null>(null);

export const AuthData = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User>({
        isAuthenticated: false,
        sub: null,
        identificacion: null,
        nombre: null,
        correo: null,
        img: null,
        rol: null,
    });

      //En caso de que se haya iniciado sesión previamente
      useEffect(()=>{
        const token = localStorage.getItem('token') ?? null;
      
        if(token) {
          const payload : User = jwtDecode(token);
          setUser({
            isAuthenticated : true,
            sub : payload.sub,
            identificacion : payload.identificacion,
            nombre : payload.nombre,
            correo : payload.correo,
            img : payload.img ?? null,
            rol : payload.rol ?? null,
          })
        }
      },[])

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}