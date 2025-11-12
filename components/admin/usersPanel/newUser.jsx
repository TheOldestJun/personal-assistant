import { useState } from "react";

import { permissions } from "@/libs/constants";
import { useCreateUserMutation } from '@/store/services/users';
import { Form, Input, Button, Divider, CheckboxGroup, Checkbox } from "@heroui/react";

export default function NewUser() {

    const [perms, setPerms] = useState([]);
    const [createUser] = useCreateUserMutation();

    const onSubmit = async (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));
        data.permissions = perms;
        try {
            const response = await createUser(data);
            console.log(response);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onSubmit={onSubmit}
        >
            <Input
                isRequired
                errorMessage="ВАЖЛИВО! Введіть ім'я користувача"
                label="Ім'я"
                labelPlacement="outside"
                name="name"
                placeholder="Введіть ім'я користувача"
                type="text"
            />

            <Input
                isRequired
                errorMessage="ВАЖЛИВО!Введіть email"
                label="Електронна пошта"
                labelPlacement="outside"
                name="email"
                placeholder="Введіть ваш email"
                type="email"
            />

            <Input
                isRequired
                errorMessage="ВАЖЛИВО!Введіть пароль"
                label="Пароль"
                labelPlacement="outside"
                name="password"
                placeholder="Введіть ваш пароль"
                type="password"
            />
            <Divider />
            <CheckboxGroup
                color="primary"
                label="Оберіть дозволи"
                value={perms}
                name="permissions"
                onValueChange={setPerms}
            >
                {permissions.map((permission) => (
                    <Checkbox key={permission.key} value={permission.key}>
                        {permission.title}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <Divider />
            <div className="flex gap-2">
                <Button color="primary" type="submit">
                    Submit
                </Button>
                <Button type="reset" variant="flat">
                    Reset
                </Button>
            </div>
        </Form>
    );
}