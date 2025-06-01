import { axiosAPI } from "@/api/axiosAPI";
import { Module } from "@/types/modules/Module";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useModulo() {

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const queryClient = useQueryClient();

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
      const newRecord = response.data.data;
      queryClient.invalidateQueries({
        queryKey: ["modules"],
        exact: false
      });
      return newRecord;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateModule(id:number, data: Module & { id: number }) {
    try {
      const response = await axiosAPI.patch(`modulos/update/${id}`, data);
      const updatedRecord = response.data.data;
      queryClient.setQueryData(["modules", page],(oldData: (Module & { id: number })[]) =>
        oldData.map((module) => {
          if (module.id === id) {
            return updatedRecord;
          }
          return module;
        })
      )
      return updatedRecord;
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
