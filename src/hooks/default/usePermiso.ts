import { axiosAPI } from "@/api/axiosAPI";
import { Modulo } from "@/types/default/Modulo";
import { Permiso } from "@/types/modules/Permiso";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function usePermiso(){

    const [selectedModule,setSelectedModule] = useState(1);
    const [modules,setModules] = useState<Modulo[] | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(()=>{
        async function getModules(){
            try{
                const {data} = await axiosAPI.get('permisos/modules');
                setModules(data.data);
            }
            catch(error){
                console.log(error);
            }
        }
        getModules();
    },[])


    async function getPermisos(){
        try{
            const {data} = await axiosAPI.get(`permisos/module/${selectedModule}?page=${page}`);
            setTotalPages(data.totalPages);
            return data.data;
        }
        catch(error){
            console.log(error);
        }
    }

    const {data : moduleWithPermisos, isLoading, isError, error} = useQuery({
        queryKey: ['permisos',selectedModule,page],
        queryFn: getPermisos,
    });

    async function createPermiso(data : Permiso){
        try{
            addToast({
                title : "Creando permiso",
                description : "Espere un momento...",
                color : "success",
                promise : axiosAPI.post('permisos',data)
                .catch(error => {
                    console.log(error);
                    addToast({
                        title : "Error creando el permiso",
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

    return { moduleWithPermisos, isLoading, isError, error, createPermiso, selectedModule, setSelectedModule, setPage, totalPages, modules };
}