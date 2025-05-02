import { AuthData } from "@/providers/AuthProvider"
import { Auth } from "@/types/default/Auth"
import { User } from "lucide-react";

export default function UserProfile(){
    const { user : { nombre, img }} = AuthData() as Auth;
    return(
        <div className="flex items-center">
            { nombre ? <p>{nombre}</p> : <p>Usuario</p>}
            
            { img ?
                <img width={'24px'} height={'24px'} src={`${import.meta.env.VITE_API_URL}uploads/${img}`} className="mx-2 rounded-full" />
            : 
                <User className="mx-2" />
            }
        </div>
    )
}