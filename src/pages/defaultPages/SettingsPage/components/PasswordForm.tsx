import { Button, Divider, Form, Input } from "@heroui/react";

export default function PasswordForm(){
    return(
        <Form>
            <Input type="password" placeholder="password123" label="Contraseña anterior" labelPlacement="outside"/>
            <Divider className="my-2 w-11/12 mx-auto"/>
            <Input className="mb-4" type="password" placeholder="newpassword123" label="Nueva contraseña" labelPlacement="outside"/>
            <Input className="mb-4" type="password" placeholder="newpassword123" label="Confirme nueva contraseña" labelPlacement="outside"/>
            <Button variant="bordered" color="danger">Cambiar contraseña</Button>
        </Form>
    )
}