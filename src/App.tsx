import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/defaultPages/index";
import LoginPage from "./pages/defaultPages/login";
import ProfilePage from "./pages/defaultPages/profile";
import NotFoundPage from "./pages/defaultPages/notfound";
import { AuthData } from "./providers/AuthProvider";
import { routesConfig } from "./config/routes";

function App() {

  const { user : { isAuthenticated }, modules } = AuthData();

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      {isAuthenticated &&
        <Route element={<ProfilePage/>} path="/profile" />
      }
      {modules && modules.map( ( module ) =>
        module.permisos.map( ( permiso, index) =>
          <Route key={index} element={routesConfig[`${module.nombre}/${permiso.rutafront.ruta}`]} path={`/${module.nombre}/${permiso.rutafront.ruta}`} />
        )
      )}
      <Route element={<NotFoundPage/>} path="*" />
    </Routes>
  );
}

export default App;
