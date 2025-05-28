import { axiosAPI } from "@/api/axiosAPI"
import { Rol } from "@/types/modules/Rol";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useRol(){

    const navigate = useNavigate();

    async function getRoles(){
        try{
            const {data} = await axiosAPI.get("roles");
            return data.data;
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

    async function createRol(data: Rol){
        try{
            const newRol = await axiosAPI.post("roles",data);
            navigate("/roles/list");
            return newRol.data.data
        }
        catch(error: any){
            console.log(error);
            addToast({
                title: "Error creating rol",
                description: error.response?.message as string || "An inexpected error occurred",
                color: "danger"
            })
        }
    }

    return {roles, isLoading, isError, error, createRol}
}