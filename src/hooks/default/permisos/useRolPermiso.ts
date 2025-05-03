import { axiosAPI } from "@/api/axiosAPI";
import { useQuery } from "@tanstack/react-query";

export default function useRolPermiso(){
    
    async function getRoles(){
        try{
            const roles = await axiosAPI.get("permisos/roles");
            return roles.data;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }

    const {data : roles, isLoading, isError, error} = useQuery({
        queryKey : ["permisoRoles"],
        queryFn : getRoles
    })

    async function getPermisoByRol(id : number){
        try{
            const { data } = await axiosAPI.get(`permisos/role/${id}`);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    return {roles, isLoading, isError, error, getPermisoByRol}
}