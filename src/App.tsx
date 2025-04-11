import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/notfound";
import { AuthData } from "./providers/AuthProvider";
import { Auth } from "./types/Auth";
import ModulesPage from "./pages/modules";

function App() {

  const { user : { isAuthenticated, rol } } = AuthData() as Auth;

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      {isAuthenticated &&
        <Route element={<ProfilePage/>} path="/profile" />
      }
      {rol == 'Administrador' &&
        <Route element={<ModulesPage />} path="/modules" />
      }
      <Route element={<NotFoundPage/>} path="*" />
    </Routes>
  );
}

export default App;
