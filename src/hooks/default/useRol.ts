import { axiosAPI } from "@/api/axiosAPI"
import { Rol } from "@/types/modules/Rol";
import { addToast } from "@heroui/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRol(){

    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);

    const navigate = useNavigate();

    async function getRoles(){
        try{
            const {data} = await axiosAPI.get(`roles?page=${page}`);
            setTotalPages(data.totalPages);
            return data.data;
        }
        catch(error){
            console.log(error);
            return error;
        }
    }

    const {data : roles, isLoading, isError, error} = useQuery({
        queryKey : ["roles",page],
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

    return {roles, isLoading, isError, error, createRol, setPage, totalPages}
}