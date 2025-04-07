import { axiosAPI } from "@/api/axiosAPI"
import { Profile } from "@/types/Profile"
import { useEffect, useState } from "react"

export default function useProfile(){

    const [ profile, setProfile] = useState<Partial<Profile>>()

    useEffect(()=>{
        async function getUser(){
            const { data : userData } : {  data : Partial<Profile> } = await axiosAPI.get('usuarios/perfil');
            setProfile(userData);
        }
        getUser();
    },[])

    return { profile }
}