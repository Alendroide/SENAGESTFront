import { Modulo } from "@/types/default/Modulo";
import { User } from "./User"

export type Auth = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    modules: Modulo[];
    setModules: React.Dispatch<React.SetStateAction<Modulo[]>>;
}