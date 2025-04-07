import { AuthData } from "@/providers/AuthProvider";
import { Auth } from "@/types/Auth";
import { ChevronDown, Menu } from "lucide-react";
import UserProfile from "../molecules/UserProfile";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

type props = {
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setIsOpen, isOpen } : props){
  
  const { user : { isAuthenticated } } = AuthData() as Auth;
  const navigate = useNavigate();

  return(
        <div className="p-2 shadow-lg z-0 h-12 w-full flex align-middle">

          <Menu className="cursor-pointer" color="#000000" size={32} strokeWidth={3} onClick={() => setIsOpen(!isOpen)} />
          
          <span className="ms-auto flex items-center">
            { isAuthenticated ?
              <div className="relative group">
                <div className="flex">
                  <UserProfile/>
                  <ChevronDown className="transition-all ease-in-out group-hover:rotate-180"/>
                </div>
                <ProfileDropdown/>
              </div>
              :
              <Button color="success" variant="bordered" onPress={()=>navigate('/login')}>Log In</Button>
            }
            
          </span>
        </div>
    )
}