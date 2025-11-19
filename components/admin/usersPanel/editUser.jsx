import { useState } from 'react'

import { permissions } from "@/libs/constants";
import {
    useGetAllUsersQuery,
    useEditUserMutation,
} from '@/store/services/users'
import { Select, SelectItem, Button, Divider, Input, Checkbox, CheckboxGroup } from '@heroui/react'

export default function EditUser() {
    const [id, setId] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [perms, setPerms] = useState([]);
    const [changePassword, setChangePassword] = useState(false);

    const [editUser] = useEditUserMutation();
    const { data: users, isLoading, error } = useGetAllUsersQuery();

    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const options = users?.map(user => ({ label: user.name, key: user.id }));

    const handleUserChange = async () => {
        console.log(users);
        const currentUser = users.find(user => user.id === id.currentKey);
        console.log(currentUser.permissions);
        setEmail(currentUser.email);
        setName(currentUser.name);
        setPerms(currentUser.permissions);
    };

    return (
        <div className="w-full max-w-xs flex flex-col gap-4">
            <Select
                className="max-w-xs"
                items={options}
                label="Оберіть користувача"
                labelPlacement="outside"
                placeholder="Ім'я"
                onSelectionChange={setId}
                isClearable={true}
                onClear={() => setId(null)}
            >
                {(user) => <SelectItem>{user.label}</SelectItem>}
            </Select>
            <Divider />
            <Button onPress={handleUserChange} color='primary' isDisabled={!id}>Обрати</Button>
            <Divider />
            <Input
                isRequired
                errorMessage="ВАЖЛИВО! Введіть ім'я користувача"
                label="Ім'я"
                labelPlacement="outside"
                name="name"
                placeholder="Введіть ім'я користувача"
                type="text"
                value={name}
            />

            <Input
                isRequired
                errorMessage="ВАЖЛИВО!Введіть email"
                label="Електронна пошта"
                labelPlacement="outside"
                name="email"
                placeholder="Введіть ваш email"
                type="email"
                value={email}
            />
            <Checkbox isSelected={changePassword} onValueChange={setChangePassword} size='sm'>
                Змінити пароль?
            </Checkbox>
            {changePassword && (
                <Input
                    errorMessage="ВАЖЛИВО!Введіть пароль"
                    label="Пароль"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Введіть ваш новий пароль"
                    type="password"
                    value={password}
                />
            )}
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
        </div>
    )
}