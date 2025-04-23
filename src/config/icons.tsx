import { Activity, AlignEndHorizontal, AppWindow, Atom, BadgeDollarSign, Ban, BatteryFull, Book, Server, Home, User } from "lucide-react";

export type IconsConfig = typeof iconsConfig;

export const iconsConfig : Record<string, JSX.Element> = {
    "Book" : <Book/>,
    "Home" : <Home/>,
    "User" : <User/>,
    "Server" : <Server/>,
    "AppWindow" : <AppWindow/>,
    "AlignEndHorizontal" : <AlignEndHorizontal/>,
    "Activity" : <Activity/>,
    "Atom" : <Atom/>,
    "BadgeDollarSign" : <BadgeDollarSign/>,
    "Ban" : <Ban/>,
    "BatteryFull" : <BatteryFull/>
}