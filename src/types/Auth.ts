import { User } from "./User"

export type Auth = {
    user : User;
    setUser : React.Dispatch<React.SetStateAction<User>>
}