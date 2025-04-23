import { useEffect, useRef } from "react";
import SidebarItem from "../molecules/SidebarItem";
import { AuthData } from "@/providers/AuthProvider";
import { Auth } from "@/types/Auth";
import AppLogo from "../molecules/AppLogo";
import { LayoutData } from "@/providers/LayoutProvider";
import SidebarItemDropdown from "../molecules/SidebarDropdown";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const { sidebarOpen, setSidebarOpen} = LayoutData();

  const { user : { isAuthenticated }, modules } = AuthData() as Auth;
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
                  bg-gray-950
                  text-white
                    w-64
                    flex-shrink-0
                    h-screen
                    transition
                    duration-200
                    ease-in-out
                    absolute
                    z-10
                    ${sidebarOpen ? "shadow-lg" : "-translate-x-full md:translate-x-0"}

                    md:shadow-lg
                    md:w-1/5
                    md:relative
                `}
        >
        {/* Logo */}
        <AppLogo/>

        {/* Contenido */}
        <div className="space-y-4 mt-10">
            <SidebarItem path="/" icon={'Home'} name="Inicio" />
            {isAuthenticated &&
              <SidebarItem path="/profile" icon={'User'} name="Perfil" />
            }

            {modules && modules.map( (module, index) =>
              <Dropdown key={index} className="dark text-white" >
                <DropdownTrigger>
                  <div>
                    <SidebarItemDropdown key={index} icon={module.icono} name={`${module.nombre.charAt(0).toUpperCase()}${module.nombre.slice(1)}`}/>
                  </div>
                </DropdownTrigger>
                <DropdownMenu onAction={(key) => navigate(`/${module.nombre}/${key}`)}>
                  {module.permisos.map( (permiso) =>
                    <DropdownItem key={permiso.rutafront.ruta}>
                      {permiso.rutafront.ruta}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            )}
        </div>
        </div>
    </>
  );
}
