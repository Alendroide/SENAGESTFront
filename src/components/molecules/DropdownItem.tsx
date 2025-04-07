import { Link } from "react-router-dom";

export default function DropdownItem({icon, name, path} : {icon : JSX.Element, name : string, path : string}) {
    return (
        <Link to={path} className="p-3 my-2 transition-all rounded-xl flex items-center space-x-4 hover:bg-slate-100">
            {icon}
            <p>{name}</p>
        </Link>
    )
}