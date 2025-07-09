import { iconsConfig, typeIcons } from "@/config/icons";
import useProfile from "@/hooks/auth/useProfile";
import { Divider } from "@heroui/react";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

export default function ProfilePage() {
  const baseURL = import.meta.env.VITE_API_URL;
  const { profile } = useProfile();

  return (
    <div className="flex box-border pt-20">
      {profile &&
        <div className="w-full mx-auto my-6 shadow-lg rounded-lg lg:w-11/12">
          <div className="flex flex-col lg:flex-row">

            {/* Profile */}
            <div className="bg-gray-900 relative rounded-lg lg:w-1/3 lg:rounded-none lg:rounded-tl-lg lg:rounded-bl-lg pb-4">
              <img
                src={`${baseURL}uploads/${profile?.img}`}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 rounded-full mx-auto border-2 border-dashed border-gray-500 shadow-lg"
                alt="pfp"
              />

              <div className="text-white font-light text-center pt-20 pb-6">
                <p>
                  {profile.primerNombre} {profile.segundoNombre || ""}{" "}
                  {profile.primerApellido} {profile.segundoApellido || ""}
                </p>
                <p>{profile.identificacion}</p>
              </div>

              <div className="text-white mx-auto w-11/12">
                
                <h3 className="font-semibold">Correo:</h3>
                <p>{profile?.correo}</p>

                <h3 className="font-semibold mt-4">Fecha de nacimiento:</h3>
                <p>{format(profile.fechaNacimiento, "d 'de' MMMM, yyyy", { locale: es })}</p>

                {profile.fichaId &&
                  <>
                    <h3 className="font-semibold mt-4">Ficha:</h3>
                    <p>{profile.fichaId}</p>
                  </>
                }

                {profile.rol &&
                  <div className="mb-4">
                    <h3 className="font-semibold mt-4">Rol:</h3>
                    <p className="flex items-center gap-4">{iconsConfig[profile.rol.icono]}{profile.rol.nombre}</p>
                  </div>
                }

              </div>
            </div>

            <Divider className="my-6 lg:hidden"/>

            {/* Permisos */}
            <div className="bg-gray-50 rounded-lg lg:w-2/3 lg:rounded-none lg:rounded-tr-lg lg:rounded-br-lg">
                {profile.rol ? profile.rol.permisos?.length > 0 ?
                  <div className="p-6">
                    <h3 className="font-semibold my-4">Permisos asignados:</h3>
                    <div>
                      {profile.rol.permisos.slice(0,8).map((permiso, index) => (
                        <p key={index} className="flex items-center gap-4 my-4">{typeIcons[permiso.tipo]}{permiso.nombre}</p>
                      ))}
                      {profile.rol.numberOfPermissions > 8 && <p className="my-4">y {profile.rol.numberOfPermissions - 8} más...</p>}
                    </div>
                  </div>
                  :
                  <p className="font-semibold text-gray-600 text-center text-2xl mt-6">Sin permisos en el sistema!</p>
                  :
                  <p className="font-semibold text-gray-600 text-center text-2xl mt-6">Sin rol asignado!</p>
                }
            </div>

          </div>
        </div>
      }
    </div>
  );
}
