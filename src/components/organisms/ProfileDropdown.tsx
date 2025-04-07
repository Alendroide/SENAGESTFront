import { Divider } from "@heroui/react";

export default function ProfileDropdown() {
    return (
        <div className="pt-3 w-56 -inset-x-28 opacity-0 translate-y-2 absolute transition-all pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
            <div className="bg-white box-border p-4 rounded-xl shadow-lg">
                <div>
                    Perfil
                </div>
                <Divider />
                <div>
                    Log Out
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}