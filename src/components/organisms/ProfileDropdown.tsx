import { Divider } from "@heroui/react";
import { PowerOff, Settings, User } from "lucide-react";
import DropdownItem from "../molecules/DropdownItem";

export default function ProfileDropdown() {
    return (
        <div className="pt-4 w-56 -inset-x-28 opacity-0 translate-y-2 absolute transition-all pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
            
            <div className="bg-white box-border px-4 py-2 rounded-xl shadow-lg">

                <DropdownItem icon={<User/>} name="Perfil" path="/profile" />
                
                <Divider />
                
                <DropdownItem icon={<PowerOff/>} name="Log Off" path="/login" />

                <Divider />

                <DropdownItem icon={<Settings/>} name="Settings" path="/settings" />

            </div>

        </div>
    )
}