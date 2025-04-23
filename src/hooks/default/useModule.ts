import { axiosAPI } from "@/api/axiosAPI";
import { Module } from "@/types/modules/Module";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useModule(){

    const navigate = useNavigate();
    
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

    async function createModule(data : Module){
        try{
            addToast({
                title : "Creando modulo",
                description : "Espere un momento...",
                color : "success",
                promise : axiosAPI.post('modulos',data)
                .then(response => {
                    console.log(response.data)
                    navigate("/modulos/list");
                })
                .catch(error => {
                    console.log(error);
                    addToast({
                        title : "Error creando el módulo",
                        description : `${error.name}`,
                        color : "danger"
                    })
                })
            })
        }
        catch(error){
            console.log(error);
        }
    }

    return {modules,isLoading,isError,error,createModule};
}