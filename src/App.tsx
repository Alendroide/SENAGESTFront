import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/defaultPages/index";
import LoginPage from "./pages/defaultPages/login";
import ProfilePage from "./pages/defaultPages/profile";
import NotFoundPage from "./pages/defaultPages/notfound";
import { AuthData } from "./providers/AuthProvider";
import { routesConfig } from "./config/routes";
import DefaultLayout from "./layouts/default";

function App() {

  const { isAuthenticated, modules } = AuthData();

  return (
    <DefaultLayout>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        {isAuthenticated &&
          <Route element={<ProfilePage/>} path="/profile" />
        }
        {modules && modules.map( ( module ) =>
          module.rutas.map( ( ruta, index) =>{
            
            const URI = `${module.nombre.toLowerCase()}/${ruta.ruta.toLowerCase()}`;
            
            return(
              <Route key={index} element={routesConfig[URI]} path={URI} />
            )
          }
          )
        )}
        <Route element={<NotFoundPage/>} path="*" />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
