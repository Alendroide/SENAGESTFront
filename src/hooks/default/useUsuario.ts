import { axiosAPI } from "@/api/axiosAPI";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsuario(){

    const [page,setPage] = useState(1);
    const [pages,setPages] = useState(1);

    async function getUsers() {
       try{
            const response = await axiosAPI.get(`usuarios/getAll?page=${page}`);
            setPages(response.data.pages);
            return response.data.users;
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
            const response = await axiosAPI.post('auth/register',data,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const json = response.data;
            return json;
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

    return { users, isLoading, isError, error, setPage, pages, createUser };

}