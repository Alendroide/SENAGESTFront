import { iconsConfig, typeIcons } from "@/config/icons";
import { Module } from "@/types/modules/Module";
import { Permiso, Rol } from "@/types/modules/Permiso";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { Switch } from "@heroui/react";
import useRolPermiso from "@/hooks/default/permisos/useRolPermiso";

export default function PermisosMatrix() {

    // Busca los roles, y trae la función para buscar los permisos por rol

  const { roles, getPermisoByRol } = useRolPermiso();

  // Rol y Modulo seleccionados

  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | undefined>(undefined);

  // Contiene los permisos del rol

  const [modules,setModules] = useState<(Module & { id : number, permisos: (Permiso & { id : number, checked : boolean})[] })[]>([]);
  const permisos = modules.find((modulo) => modulo.id === selectedModule)?.permisos;

  // Iconos

  const roleIcon = selectedRole ? iconsConfig[ roles?.find((rol: Rol) => rol.id === selectedRole)?.icono ] : "";
  const moduleIcon = selectedModule ? iconsConfig[ modules?.find((modulo: Module & { id : number }) => modulo.id === selectedModule)?.icono as string ] : "";

    // Busca los permisos del rol seleccionado

  async function handleChange(e : React.ChangeEvent<HTMLSelectElement>) {
    const rolId = parseInt(e.target.value);
    setSelectedModule(undefined);
    if(isNaN(rolId)){
        setSelectedRole(null);
        setModules([]);
        return;
    }
    const permisos = await getPermisoByRol(rolId);
    setSelectedRole(rolId);
    setModules(permisos);
  }

  return (
    <div>
        <div className="flex items-center gap-4 my-6">

            <Select
                startContent={ roleIcon }
                label="Roles"
                onChange={handleChange}
                className="w-full md:w-1/3"
            >
                {roles?.map(
                (rol: Rol) => (
                    <SelectItem
                    startContent={iconsConfig[rol.icono]}
                    key={rol.id}
                    >
                    {rol.nombre}
                    </SelectItem>
                )
                )}
            </Select>

            {modules.length > 0 && (
                <Select
                    startContent={ moduleIcon }
                    label="Módulos"
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(parseInt(e.target.value))}
                    className="w-full md:w-1/3"
                >
                {modules.map((modulo) => (
                    <SelectItem key={modulo.id} startContent={iconsConfig[modulo.icono]}>
                        {modulo.nombre}
                    </SelectItem>
                ))}
                </Select>
            )}

        </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {permisos?.map((permiso) => (
          <div className="flex" key={permiso.id}>
            <span className="mr-2">{typeIcons[permiso.tipo]}</span>
            {permiso.nombre}
            <Switch defaultSelected={permiso.checked} className="ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
