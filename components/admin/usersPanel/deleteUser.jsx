import { useState } from "react";

import { useDeleteUserMutation, useGetAllUsersQuery } from "@/store/services/users";
import { Select, SelectItem, Button, Divider } from "@heroui/react";

export default function DeleteUser() {
    const [deleteUser] = useDeleteUserMutation();
    const { data: users, isLoading, error } = useGetAllUsersQuery();
    const [value, setValue] = useState(null);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const options = users?.map(user => ({ label: user.name, key: user.id }));


    const handleDelete = async () => {
        try {
            const response = await deleteUser(value.currentKey);
            console.log(response);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <div className="w-full max-w-xs flex flex-col gap-4">
            <Select
                className="max-w-xs"
                items={options}
                label="Оберіть користувача для видалення"
                labelPlacement="outside"
                placeholder="Оберіть..."
                onSelectionChange={setValue}
                isClearable={true}
            >
                {(user) => <SelectItem>{user.label}</SelectItem>}
            </Select>
            <Divider />
            <Button onPress={handleDelete}>Видалити</Button>
        </div>

    );
}