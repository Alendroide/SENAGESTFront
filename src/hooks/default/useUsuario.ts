import { axiosAPI } from "@/api/axiosAPI";
import { UsuarioUpdate } from "@/types/modules/Usuario";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsuario(){

    const queryClient = useQueryClient();

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
            const newRecord = response.data.data;
            queryClient.invalidateQueries({
                queryKey: ["users"],
                exact: false
            });
            return newRecord;
        }
        catch(error){
            console.log(error);
        }
    }

    async function updateUser(id: number, data: UsuarioUpdate) {
        try{
            const response = await axiosAPI.patch(`usuarios/${id}`, data);
            const updatedRecord = response.data.data;
            queryClient.invalidateQueries({
                queryKey: ["users"],
                exact: false
            });
            return updatedRecord;
        }
        catch(error){
            console.log(error);
        }
    }

    return { users, isLoading, isError, error, setPage, totalPages, createUser, updateUser };

}