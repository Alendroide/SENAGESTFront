import { axiosAPI } from "@/api/axiosAPI";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsuario(){

    const [page,setPage] = useState(1);

    async function getUsers() {
       try{
            const response = await axiosAPI.get(`usuarios/getAll?page=${page}`);
            return response.data;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    const {data: users,isLoading,isError,error} = useQuery({
        queryKey: ["users",page],
        queryFn: getUsers
    })

    return { users, isLoading, isError, error, setPage };

}