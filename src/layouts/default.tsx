//Components
import Navbar from "@/components/organisms/Navbar";
import Sidebar from "@/components/organisms/Sidebar";

//Icons
//import { Menu, User } from "lucide-react";

import { useState } from "react";

export default function DefaultLayout({ children } : { children: React.ReactNode; }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="w-full">

        <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {children}

      </div>
    </div>
  );
}
