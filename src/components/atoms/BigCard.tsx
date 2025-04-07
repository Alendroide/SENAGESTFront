export default function BigCard({children} : {children : React.ReactNode}){
    return(
        <div className='
            space-y-4
            box-border
            p-5
            
            md:mx-auto
            md:shadow-lg
            md:rounded-xl
            md:mt-12
        '>
            {children}
        </div>
    )
}