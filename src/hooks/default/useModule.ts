import { axiosAPI } from "@/api/axiosAPI";
import { useQuery } from "@tanstack/react-query";

export default function useModule(){
    
    async function getModules(){
        try{
            const {data} = await axiosAPI.get('modulos');
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const {data : modules,isLoading,isError,error} = useQuery({
        queryKey : ['modules'],
        queryFn : getModules
    });

    return {modules,isLoading,isError,error};
}