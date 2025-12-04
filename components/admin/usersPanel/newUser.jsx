import { useState } from 'react';

import usePermissionTree from "@/hooks/usePermissionTree";
import { permissionsTree } from '@/libs/constants';
import { useCreateUserMutation } from '@/store/services/users';
import {
  Form,
  Input,
  Button,
  Divider,
  CheckboxGroup,
  Checkbox,
} from '@heroui/react';
import PermissionGroup from './permissionGroup';

export default function NewUser() {
  const [createUser] = useCreateUserMutation();

  const {
    perms,
    togglePermission,
    toggleChildren,
  } = usePermissionTree(permissionsTree);

  const onSubmit = async e => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target));

    data.permissions = perms;

    await createUser(data);
  };

  return (
    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input name="name" label="Ім'я" isRequired />
      <Input name="email" label="Email" type="email" isRequired />
      <Input name="password" label="Пароль" type="password" isRequired />

      <Divider />

      <PermissionGroup
        tree={permissionsTree}
        perms={perms}
        togglePermission={togglePermission}
        toggleChildren={toggleChildren}
      />

      <Divider />

      <Button color="primary" type="submit">
        Додати
      </Button>
    </Form>
  );
}