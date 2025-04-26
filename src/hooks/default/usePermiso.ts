import { axiosAPI } from "@/api/axiosAPI";
import { useQuery } from "@tanstack/react-query";

export default function usePermiso(){
    async function getPermisos(){
        try{
            const {data} = await axiosAPI.get('permisos/bymodulo');
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const {data : modulesWithPermisos, isLoading, isError, error} = useQuery({
        queryKey: ['permisos'],
        queryFn: getPermisos,
    });

    return {modulesWithPermisos, isLoading, isError, error};
}