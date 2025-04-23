import { Module } from "@/types/default/Module";
import { User } from "./User"

export type Auth = {
    user : User;
    setUser : React.Dispatch<React.SetStateAction<User>>;
    modules : Module[]
    setModules : React.Dispatch<React.SetStateAction<Module[]>>;
}