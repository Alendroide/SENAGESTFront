import { useEffect, useRef } from "react";
import SidebarItem from "../molecules/SidebarItem";
import { Home, Server, User } from "lucide-react";
import { AuthData } from "@/providers/AuthProvider";
import { Auth } from "@/types/Auth";
import AppLogo from "../molecules/AppLogo";
import { LayoutData } from "@/providers/LayoutProvider";

export default function Sidebar() {

  const { sidebarOpen, setSidebarOpen} = LayoutData();

  const { user : { isAuthenticated }, modules } = AuthData() as Auth;
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      )
        setSidebarOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Fondo oscuro */}
        <div
            className={`
                fixed
                inset-0
                bg-black
                z-10
                transition-opacity
                duration-200
                ${sidebarOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}/>

        {/* Sidebar */}
        <div
        ref={sidebarRef}
        className={`
                    w-64
                    bg-white
                    flex-shrink-0
                    h-screen
                    transition
                    duration-200
                    ease-in-out
                    absolute
                    z-10
                    ${sidebarOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"}

                    md:shadow-lg
                    md:w-1/5
                `}
        >
        {/* Logo */}
        <AppLogo/>

        {/* Contenido */}
        <div className="space-y-4 mt-10">
            <SidebarItem path="/" icon={<Home />} name="Inicio" />
            {isAuthenticated &&
              <SidebarItem path="/profile" icon={<User />} name="Perfil" />
            }

            {modules.map( (module, index) =>
              <SidebarItem key={index} path={`/${module.nombre}`} icon={<Server/>} name={`${module.nombre.charAt(0).toUpperCase()}${module.nombre.slice(1)}`}/>
            )}
        </div>
        </div>
    </>
  );
}
