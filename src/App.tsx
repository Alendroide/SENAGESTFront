import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./types/User";
import { Auth } from "./types/Auth";
import LoginPage from "./pages/login";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<Auth | null>(null);

export const AuthData = () => useContext(AuthContext);

function App() {

  const [user, setUser] = useState<User>({
    sub: null,
    identificacion: null,
    nombre: null,
    isAuthenticated : false,
    img: null,
  });

  //En caso de que se haya iniciado sesión previamente
  useEffect(()=>{
    const token = localStorage.getItem('token') ?? null;
  
    if(token) {
      const payload : User = jwtDecode(token);
      setUser({
        sub : payload.sub,
        identificacion : payload.identificacion,
        nombre : payload.nombre,
        isAuthenticated : true,
        img : payload.img ?? null
      })
    }
  },[])

  return (
    <AuthContext.Provider value={{user,setUser}}>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
