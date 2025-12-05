import { useState } from 'react';

import usePermissionTree from '@/hooks/usePermissionTree';
import { permissionsTree } from '@/libs/constants';
import {
  useGetAllUsersQuery,
  useEditUserMutation,
} from '@/store/services/users';
import {
  Select,
  SelectItem,
  Button,
  Divider,
  Input,
  Checkbox,
  CheckboxGroup,
  addToast,
} from '@heroui/react';
import PermissionGroup from './permissionGroup';

export default function EditUser() {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [changePassword, setChangePassword] = useState(false);
  const { perms, setPerms, togglePermission, toggleChildren } =
    usePermissionTree(permissionsTree);

  const [editUser] = useEditUserMutation();
  const { data: users, isLoading, error } = useGetAllUsersQuery();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const options = users?.map(user => ({
    label: user.name,
    key: user.id,
  }));

  const handleUserChange = () => {
    const currentUser = users.find(user => user.id === id.currentKey);

    setName(currentUser.name);
    setEmail(currentUser.email);

    // Загружаем все permissions (включая extra)
    setPerms(currentUser.permissions.map(p => p.key));
  };

  const handleClear = () => {
    setId(null);
    setEmail('');
    setName('');
    setPerms([]);
  };

  const handleEdit = async () => {
    const response = await editUser({
      id: id?.currentKey,
      name,
      email,
      permissions: perms,
      password: changePassword ? password : undefined,
    });
    if (response) {
      addToast({
        title: response.data.message,
        type: 'success',
      });
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Select
        className="max-w-xs"
        items={options}
        label="Оберіть користувача"
        labelPlacement="outside"
        placeholder="Ім'я"
        onSelectionChange={setId}
        isClearable={true}
        onClear={handleClear}
      >
        {user => <SelectItem key={user.key}>{user.label}</SelectItem>}
      </Select>

      <Divider />

      <Button onPress={handleUserChange} color="primary" isDisabled={!id}>
        Обрати
      </Button>

      <Divider />

      <Input
        isRequired
        label="Ім'я"
        name="name"
        placeholder="Введіть ім'я користувача"
        type="text"
        value={name}
        onValueChange={setName}
      />

      <Input
        isRequired
        label="Електронна пошта"
        name="email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />

      <Checkbox
        isSelected={changePassword}
        onValueChange={setChangePassword}
        size="sm"
      >
        Змінити пароль?
      </Checkbox>

      {changePassword && (
        <Input
          label="Пароль"
          name="password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />
      )}

      <Divider />
      <PermissionGroup
        tree={permissionsTree}
        perms={perms}
        togglePermission={togglePermission}
        toggleChildren={toggleChildren}
      />

      <Divider />

      <Button color="primary" onPress={handleEdit}>
        Зберегти
      </Button>
    </div>
  );
}
