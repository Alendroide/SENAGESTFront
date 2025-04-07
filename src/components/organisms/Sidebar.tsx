import { useEffect, useRef } from "react";
import SidebarItem from "../molecules/SidebarItem";
import { Home, User } from "lucide-react";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
        <div
            className={`
                fixed
                inset-0
                bg-black
                z-10
                transition-opacity
                duration-200
                ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}/>

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
                    ${isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"}

                    md:shadow-lg
                    md:w-1/5  
                `}
        >
        <div className="flex justify-center">
            <p className="text-2xl font-bold mt-6">SENAGEST</p>
        </div>
        <div className="space-y-4 mt-10">
            <SidebarItem icon={<Home />} name="Inicio" />
            <SidebarItem icon={<User />} name="Perfil" />
        </div>
        </div>
    </>
  );
}
