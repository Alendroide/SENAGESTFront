import { axiosAPI } from "@/api/axiosAPI";
import { addToast } from "@heroui/toast";
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

    async function asignPermiso(permisoId : number,rolId : number,valor : boolean){
        try{
            await axiosAPI.post(`permisos/asign/${permisoId}/${rolId}/${valor}`)
        }
        catch(error : any){
            addToast({
                title : "Error asignando el permiso",
                description : `${error?.name ?? "Error desconocido"}`,
                color : "danger"
            })
            console.log(error);
        }
    }

    return {roles, isLoading, isError, error, getPermisoByRol, asignPermiso}
}