import { axiosAPI } from "@/api/axiosAPI";
import { AsignPermiso, Permiso } from "@/types/modules/Permiso";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function usePermiso(){

    const navigate = useNavigate();

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

    async function createPermiso(data : Permiso){
        try{
            addToast({
                title : "Creando permiso",
                description : "Espere un momento...",
                color : "success",
                promise : axiosAPI.post('permisos',data)
                .then(() => {
                    navigate("/permisos/list");
                })
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

    async function asignPermiso({permisoId,rolId,valor} : AsignPermiso){
        try{
            addToast({
                title : "Asignando permiso",
                description : "Espere un momento...",
                color : "success",
                promise : axiosAPI.post(`permisos/asign/${permisoId}/${rolId}/${valor}`)
                .then(() => {
                    navigate("/permisos/list");
                })
                .catch(error => {
                    console.log(error);
                    addToast({
                        title : "Error asignando el permiso",
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

    return {modulesWithPermisos, isLoading, isError, error, createPermiso, asignPermiso};
}