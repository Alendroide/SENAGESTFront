import { useEffect, useRef } from "react";

export default function Sidebar({isOpen, setIsOpen} : {isOpen: boolean, setIsOpen : React.Dispatch<React.SetStateAction<boolean>>}) {

    const sidebarRef  = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
          if ( sidebarRef.current && !sidebarRef.current.contains(event.target as Node) ) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
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
                ${isOpen ?
                    'translate-x-0 shadow-lg' : '-translate-x-full'
                }
                
                md:shadow-lg
                md:w-1/5  
            `}
        >
            <div className="flex justify-center">
                <p className="text-2xl font-bold">
                    SENAGEST
                </p>
            </div>
        </div>
    );
}