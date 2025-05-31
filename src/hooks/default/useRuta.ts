import { axiosAPI } from "@/api/axiosAPI";
import { Modulo } from "@/types/default/Modulo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useRutas() {
  const [selectedModule, setSelectedModule] = useState(1);
  const [modules, setModules] = useState<Modulo[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getModules() {
      try {
        const { data } = await axiosAPI.get("rutas/modules");
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

    const {data : moduleWithRutas, isLoading, isError, error} = useQuery({
        queryKey: ['rutas',selectedModule,page],
        queryFn: getRutas,
    });

  return { moduleWithRutas, isLoading, isError, error, selectedModule, setSelectedModule, setPage, totalPages, modules };
}
