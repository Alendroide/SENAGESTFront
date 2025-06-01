import { axiosAPI } from "@/api/axiosAPI";
import { Module } from "@/types/modules/Module";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useModulo() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getModules() {
    try {
      const { data } = await axiosAPI.get(`modulos?page=${page}`);
      setTotalPages(data.totalPages);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: modules,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["modules", page],
    queryFn: getModules,
  });

  async function createModule(data: Module) {
    try {
      const response = await axiosAPI.post("modulos", data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateModule(id:number, data: Module) {
    try {
      const response = await axiosAPI.patch(`modulos/update/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    modules,
    isLoading,
    isError,
    error,
    createModule,
    updateModule,
    setPage,
    totalPages,
  };
}
