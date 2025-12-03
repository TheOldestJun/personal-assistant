import { useState } from 'react';

import { permissions, extraSupplyPermissions } from '@/libs/constants';
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
} from '@heroui/react';

export default function EditUser() {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [perms, setPerms] = useState([]);
  const [changePassword, setChangePassword] = useState(false);

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

  const handleMainPermissions = values => {
    setPerms(values);
  };

  const handleExtraPermissions = values => {
    const withoutExtra = perms.filter(
      p => !extraSupplyPermissions.some(e => e.key === p),
    );

    setPerms([...withoutExtra, ...values]);
  };

  const handleClear = () => {
    setId(null);
    setEmail('');
    setName('');
    setPerms([]);
  };

  const hasSupplyAll = perms.includes('SUPPLY_ALL');
  const selectedExtra = perms.filter(p =>
    extraSupplyPermissions.some(e => e.key === p),
  );

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
        {user => <SelectItem>{user.label}</SelectItem>}
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

      {/* Основные разрешения */}
      <CheckboxGroup
        color="primary"
        label="Оберіть дозволи"
        value={perms}
        onValueChange={handleMainPermissions}
      >
        {permissions.map(permission => (
          <Checkbox key={permission.key} value={permission.key}>
            {permission.title}
          </Checkbox>
        ))}
      </CheckboxGroup>

      {/* Дополнительные разрешения */}
      {hasSupplyAll && (
        <>
          <Divider />
          <CheckboxGroup
            color="secondary"
            label="Додаткові дозволи для Забезпечення"
            value={selectedExtra}
            onValueChange={handleExtraPermissions}
          >
            {extraSupplyPermissions.map(item => (
              <Checkbox key={item.key} value={item.key}>
                {item.title}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </>
      )}

      <Divider />

      <Button
        color="primary"
        onPress={() =>
          editUser({
            id: id?.currentKey,
            name,
            email,
            password: changePassword ? password : undefined,
            permissions: perms,
          })
        }
      >
        Зберегти
      </Button>
    </div>
  );
}
