import { axiosAPI } from "@/api/axiosAPI"
import { useQuery } from "@tanstack/react-query";

export default function useProfile(){

    async function getProfile(){
        try{
            const { data } = await axiosAPI.get('usuarios/perfil');
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const { data : profile } = useQuery({
        queryKey : ['profile'],
        queryFn : getProfile
    })


    return { profile }
}