import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import NotFoundPage from "./pages/notfound";
import { AuthData } from "./providers/AuthProvider";
import { Auth } from "./types/Auth";

function App() {

  const { user } = AuthData() as Auth;

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      { user.isAuthenticated &&
        <Route element={<ProfilePage/>} path="/profile" />
      }
      <Route element={<NotFoundPage/>} path="*" />
    </Routes>
  );
}

export default App;
