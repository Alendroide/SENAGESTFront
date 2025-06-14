import { axiosAPI } from "@/api/axiosAPI";
import { Module } from "@/types/modules/Module";
import { Ruta } from "@/types/modules/Ruta";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useRuta() {

  const queryClient = useQueryClient();

  const [selectedModule, setSelectedModule] = useState(1);
  const [modules, setModules] = useState<Module[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getModules() {
      try {
        const { data } = await axiosAPI.get("modulos/all");
        setModules(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getModules();
  }, []);

      async function getRutas(){
        try{
            const {data} = await axiosAPI.get(`rutas/module/${selectedModule}?page=${page}`);
            setTotalPages(data.totalPages);
            return data.data;
        }
        catch(error){
            console.log(error);
        }
    }

    async function getAllRutasByModule(id: number){
      try{
        const {data} = await axiosAPI.get(`rutas/all/module/${id}`);
        return data.data;
      }
      catch(error){
        console.log(error);
      }
    }

    const {data : moduleWithRutas, isLoading, isError, error} = useQuery({
        queryKey: ['rutas',selectedModule,page],
        queryFn: getRutas,
    });

    async function createRuta(data: Ruta){
      try{
        const newRuta = await axiosAPI.post("rutas",data);
        const record = newRuta.data.data;
        queryClient.invalidateQueries({
          queryKey: ['rutas'],
          exact: false
        })
        return record
      }
      catch(error){
        console.log(error);
      }
    }

    async function updateRuta(id: number, data: Ruta) {
      try {
        const response = await axiosAPI.patch(`rutas/update/${id}`, data);
        const updatedRecord = response.data.data;
        queryClient.invalidateQueries({
          queryKey: ["rutas"],
          exact: false
        });
        return updatedRecord;
      } catch (error) {
        console.log(error);
      }
    }

  return { moduleWithRutas, isLoading, isError, error, selectedModule, setSelectedModule, setPage, totalPages, modules, createRuta, getAllRutasByModule, updateRuta };
}
