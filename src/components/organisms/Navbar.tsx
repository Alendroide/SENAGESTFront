import { AuthData } from "@/App";
import { Auth } from "@/types/Auth";
import { Menu } from "lucide-react";
import UserProfile from "../molecules/UserProfile";
import { Button } from "@heroui/button";
import { Link, useNavigate } from "react-router-dom";
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
                <Link to={'/profile'}>
                  <UserProfile/>
                </Link>
                <ProfileDropdown/>
              </div>
              :
              <Button color="success" variant="bordered" onPress={()=>navigate('/login')}>Log In</Button>
            }
            
          </span>
        </div>
    )
}