import { useState } from "react";

import { permissions, extraSupplyPermissions } from "@/libs/constants";
import { useCreateUserMutation } from "@/store/services/users";
import {
  Form,
  Input,
  Button,
  Divider,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";

export default function NewUser() {
  const [perms, setPerms] = useState([]);
  const [createUser] = useCreateUserMutation();

  const handleMainPermissions = values => {
    setPerms(values); // основной список пермишенов
  };

  const handleExtraPermissions = values => {
    // Убираем старые extra-perms и добавляем новые
    const withoutExtra = perms.filter(
      p => !extraSupplyPermissions.some(e => e.key === p)
    );

    setPerms([...withoutExtra, ...values]);
  };

  const onSubmit = async e => {
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

  const hasSupplyAll = perms.includes("SUPPLY_ALL");

  // Получаем только выбранные extra-permissions
  const selectedExtra = perms.filter(p =>
    extraSupplyPermissions.some(e => e.key === p)
  );

  return (
    <Form className="flex w-full max-w-xs flex-col gap-4" onSubmit={onSubmit}>
      <Input
        isRequired
        label="Ім'я"
        name="name"
        placeholder="Введіть ім'я користувача"
      />

      <Input
        isRequired
        label="Електронна пошта"
        name="email"
        type="email"
      />

      <Input
        isRequired
        label="Пароль"
        name="password"
        type="password"
      />

      <Divider />

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

      {hasSupplyAll && (
        <>
          <Divider />
          <CheckboxGroup
            color="secondary"
            label="Дозволи для Забезпечення"
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

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Додати
        </Button>
        <Button type="reset" variant="flat">
          Скасувати
        </Button>
      </div>
    </Form>
  );
}
