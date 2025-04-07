export default function SidebarItem({icon, name} : {icon : JSX.Element, name : string}){
    return(
        <div className="
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
        </div>
    )
}