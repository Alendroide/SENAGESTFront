//Components
import Navbar from "@/components/organisms/Navbar";
import Sidebar from "@/components/organisms/Sidebar";

//Icons
//import { Menu, User } from "lucide-react";

export default function DefaultLayout({ children } : { children: React.ReactNode; }) {

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="w-full">

        <Navbar/>

        {children}

      </div>
    </div>
  );
}
