import { AuthData } from "@/providers/AuthProvider";

export default function usePermissions(){

    const { permissions } = AuthData();

    function hasPermission(id : number) : boolean {
        return permissions.find((permiso) => permiso.id === id) !== undefined;
    }

    return { hasPermission };
}