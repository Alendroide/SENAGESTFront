import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./types/User";
import { Auth } from "./types/Auth";
import LoginPage from "./pages/login";
import { jwtDecode } from "jwt-decode";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/notfound";

const AuthContext = createContext<Auth | null>(null);

export const AuthData = () => useContext(AuthContext);

function App() {

  const [user, setUser] = useState<User>({
    isAuthenticated : false,
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
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        { user.isAuthenticated &&
          <Route element={<ProfilePage/>} path="/profile" />
        }
        <Route element={<NotFoundPage/>} path="*" />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
