import BigCard from "@/components/atoms/BigCard";
import Subtitle from "@/components/atoms/text/Subtitle";
import Title from "@/components/atoms/text/Title";
import useProfile from "@/hooks/auth/useProfile";

export default function ProfilePage(){

    const { profile } = useProfile();

    return(
        <>
            <div className="md:w-3/4 mx-auto">
                <BigCard>
                    <div className="flex flex-col md:flex-row w-full">
                        <div className="w-full my-8 md:w-1/4 md:my-0">
                            <img
                                className="w-1/2 mx-auto rounded-full"
                                src={`${import.meta.env.VITE_API_URL}uploads/${profile?.img}`}
                                alt="User profile picture"
                            />
                        </div>
                        <div className="w-full space-y-4 md:w-3/4 md:space-y-2">
                            <span className="text-center md:text-start">
                                <Title>{profile?.nombre ?? 'Unknown user'}</Title>
                            </span>

                            <Subtitle>CC: {profile?.identificacion} </Subtitle>
                            
                            {profile?.rol &&
                                <Subtitle>Rol: {profile.rol} </Subtitle>
                            }
                            
                            <Subtitle>E-Mail: {profile?.correo} </Subtitle>
                        </div>
                    </div>
                </BigCard>
            </div>

        </>
    )
}