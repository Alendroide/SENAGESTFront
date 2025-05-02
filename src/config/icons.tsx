import { Activity, AlignEndHorizontal, AppWindow, Atom, BadgeDollarSign, Ban, BatteryFull, Book, Server, Home, User, NotebookPen, NotebookText, RefreshCw } from "lucide-react";

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

export const typeIcons : Record<string, JSX.Element> = {
    "write" : <NotebookPen/>,
    "read" : <NotebookText/>,
    "update" : <RefreshCw/>
}