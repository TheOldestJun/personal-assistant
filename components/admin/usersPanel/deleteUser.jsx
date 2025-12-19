import { useState } from 'react';

import InputSkeleton from '@/components/custom/inputSkeleton';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '@/store/services/users';
import { Select, SelectItem, Button, Divider, addToast } from '@heroui/react';

export default function DeleteUser() {
  const [deleteUser] = useDeleteUserMutation();
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [value, setValue] = useState(null);

  if (isLoading) {
    return <InputSkeleton label="Оберіть користувача для видалення" />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const options = users?.map(user => ({ label: user.name, key: user.id }));

  const handleDelete = async () => {
    try {
      const response = await deleteUser(value.currentKey);
      if (response) {
        addToast({
          title: response.data.message,
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
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className='text-sm'>Оберіть користувача для видалення</div>
      <Select
        className="max-w-xs"
        items={options}
        placeholder="Оберіть..."
        onSelectionChange={setValue}
        isClearable={true}
        onClear={() => setValue(null)}
      >
        {user => <SelectItem>{user.label}</SelectItem>}
      </Select>
      <Divider />
      <Button onPress={handleDelete} color="danger" isDisabled={!value}>
        Видалити
      </Button>
    </div>
  );
}