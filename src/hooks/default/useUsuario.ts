import { axiosAPI } from "@/api/axiosAPI";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsuario(){

    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    async function getUsers() {
       try{
            const {data} = await axiosAPI.get(`usuarios?page=${page}`);
            setTotalPages(data.totalPages);
            return data.data;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    const {data: users,isLoading,isError,error} = useQuery({
        queryKey: ["users",page],
        queryFn: getUsers
    });

    async function createUser(data: FormData){
        try{
            const response = await axiosAPI.post('usuarios',data,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data.data;
        }
        catch(error){
            addToast({
                title: "Error creando usuario",
                description: "Hubo un error inesperado",
                color: "danger"
            })
            throw error;
        }
    }

    return { users, isLoading, isError, error, setPage, totalPages, createUser };

}