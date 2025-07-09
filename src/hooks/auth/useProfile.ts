import { axiosAPI } from "@/api/axiosAPI"
import { useQuery } from "@tanstack/react-query";

type Profile = {
    id: number;
    identificacion: number;
    primerNombre: string;
    segundoNombre: string | null;
    primerApellido: string;
    segundoApellido: string | null;
    correo: string;
    fichaId: number | null;
    img: string;
    fechaNacimiento: string;
    rol: {
        id: number;
        nombre: string;
        icono: string;
        permisos: {
            id: number;
            nombre: string;
            descripcion: string;
            tipo: string;
        }[];
        numberOfPermissions: number
    } | undefined;
    estado: boolean;
}

export default function useProfile(){

    async function getProfile(){
        try{
            const { data } = await axiosAPI.get('usuarios/perfil');
            return data.data;
        }
        catch(error){
            console.log(error);
        }
    }

    const { data : profile } = useQuery<Profile>({
        queryKey : ['profile'],
        queryFn : getProfile
    })


    return { profile }
}