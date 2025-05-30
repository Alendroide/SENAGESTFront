import { axiosAPI } from "@/api/axiosAPI";
import { Module } from "@/types/modules/Module";
import { addToast } from "@heroui/toast";
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
      addToast({
        title: "Creando modulo",
        description: "Espere un momento...",
        color: "success",
        promise: axiosAPI
          .post("modulos", data)
          .catch((error) => {
            console.log(error);
            addToast({
              title: "Error creando el módulo",
              description: `${error.name}`,
              color: "danger",
            });
          }),
      });
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
    setPage,
    totalPages,
  };
}
