import { AuthData } from "@/App"
import { Auth } from "@/types/Auth"
import { User } from "lucide-react";

export default function UserProfile(){
    const { user : { nombre, img }} = AuthData() as Auth;
    return(
        <div className="flex items-center">
            { nombre ? <p>{nombre}</p> : <p>Usuario</p>}
            
            { img ?
                <img width={'24px'} height={'24px'} src={img} className="mx-2" />
            : 
                <User color="#000000" className="mx-2" />
            }
        </div>
    )
}