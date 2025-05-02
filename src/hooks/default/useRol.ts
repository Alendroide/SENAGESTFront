import { axiosAPI } from "@/api/axiosAPI"
import { useQuery } from "@tanstack/react-query";

export default function useRol(){

    async function getRoles(){
        try{
            const roles = await axiosAPI.get("roles");
            return roles.data;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }

    const {data : roles, isLoading, isError, error} = useQuery({
        queryKey : ["roles"],
        queryFn : getRoles
    })

    return {roles, isLoading, isError, error}
}