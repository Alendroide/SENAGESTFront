import { axiosAPI } from "@/api/axiosAPI"
import { User } from "@/types/User";
import { useEffect, useState } from "react"

export default function useProfile(){

    const [ profile, setProfile] = useState<Partial<User>>()

    useEffect(()=>{
        async function getUser(){
            const { data : userData } : {  data : Partial<User> } = await axiosAPI.get('usuarios/perfil');
            setProfile(userData);
        }
        getUser();
    },[])

    return { profile }
}