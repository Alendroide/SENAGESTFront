import { axiosAPI } from "@/api/axiosAPI";
import { Modulo } from "@/types/default/Modulo";
import { Permiso } from "@/types/modules/Permiso";
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
                const {data} = await axiosAPI.get('modulos/all');
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
            const response = await axiosAPI.post('permisos',data);
            return response.data.data;
        }
        catch(error){
            console.log(error);
        }
    }

    return { moduleWithPermisos, isLoading, isError, error, createPermiso, selectedModule, setSelectedModule, setPage, totalPages, modules };
}