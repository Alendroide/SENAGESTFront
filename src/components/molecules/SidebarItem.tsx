import { Link } from "react-router-dom";

export default function SidebarItem({icon, name, path} : {icon : JSX.Element, name : string, path : string}){
    return(
        <Link to={path} className="
            flex
            items-center
            w-56
            py-2
            rounded-3xl
            shadow-lg
            mx-auto
            ps-4
            cursor-pointer

            md:w-48
        ">
            {icon}
            <p className="ms-2">{name}</p>
        </Link>
    )
}