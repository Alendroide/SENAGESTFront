import { Button } from "@heroui/button";

type props = {
    onPress?: () => void;
    className?: string;
    children: React.ReactNode
}

export default function CustomButton({onPress, className, children}: props){
    return(
        <Button
          onPress={onPress}
          className={`my-4 border-gray-800 text-gray-800 ${className ?? ""}`}
          color="success"
          variant="bordered"
        >
          {children}
        </Button>
    )
}