import { useState } from "react";

import ComboBox from "@/components/custom/comboBox";
import { useGetAllUnitsQuery, useDeleteUnitMutation, useCreateUnitMutation } from "@/store/services/units";
import { addToast, Button } from "@heroui/react";

export default function EditUnitsTitle() {
    const { data, isLoading, error } = useGetAllUnitsQuery();
    const [deleteUnit] = useDeleteUnitMutation();
    const [createUnit] = useCreateUnitMutation();
    const [value, setValue] = useState(null);

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div>Error: {error.message}</div>;



    const options = data?.map(product => ({ label: product.title, value: product.id }));

    const handleCreate = async (value) => {
        try {
            const response = await createUnit({ title: value.toUpperCase() });
            if (response) {
                addToast({
                    title: "Одиницю виміру успішно створено",
                    type: 'success',
                });
            }
        } catch (error) {
            addToast({
                title: 'Помилка',
                description: error.message,
                color: 'danger',
            });
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteUnit(value.value);
            if (response) {
                addToast({
                    title: "Одиницю виміру успішно видалено",
                    type: 'success',
                });
            }
        } catch (error) {
            addToast({
                title: 'Помилка',
                description: error.message,
                color: 'danger',
            });
        }
    };

    return (
        <div>
            <ComboBox
                options={options}
                placeholder="Оберіть..."
                onSelectedOption={async value => {
                    setValue(value);
                }}
                onCreateOption={value => handleCreate(value)}
            />
            {value && (
                <div>
                    <Button color="danger" onPress={handleDelete} className="w-full mt-2">Видалити</Button>
                </div>
            )}
        </div>
    );
}