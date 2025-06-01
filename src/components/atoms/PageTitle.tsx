export default function PageTitle({children} : {children: React.ReactNode}){
    return(
        <h1 className="text-2xl font-bold my-6">{children}</h1>
    )
}