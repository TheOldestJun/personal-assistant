import axios from 'axios';
import { useDispatch } from 'react-redux';

import { encryptJwtWithSecret } from '@/libs/crypto';
import { getClientSecret } from '@/libs/secretProvider';
import { login } from '@/store/reducers/authSlice';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Input,
  Button,
} from '@heroui/react';

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = async e => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    const response = await axios.post('/api/users/login', data);
    console.log(response.data.token);
    if (response.data.token) {
      const secret = await getClientSecret();
      console.log(secret);
      const jwt = await encryptJwtWithSecret(secret, response.data.token);
      localStorage.setItem('token', jwt);
      dispatch(login({ token: response.data.token }));
    } else throw new Error(response.data.error);
  };

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <Card className="max-w-sm">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold text-sky-800">Вхід</h1>
        </CardHeader>
        <CardBody>
          <Form
            className="flex w-full max-w-xs flex-col gap-4"
            onSubmit={handleLogin}
          >
            <Input
              isRequired
              errorMessage="Це поле обов'язкове. Введіть пошту"
              label="Ваша пошта"
              labelPlacement="outside"
              name="email"
              placeholder="Ваша електронна пошта"
              type="email"
            />

            <Input
              isRequired
              errorMessage="Це поле обов'язкове. Введіть пароль"
              label="Пароль"
              labelPlacement="outside"
              name="password"
              placeholder="Ваш пароль"
              type="password"
            />
            <CardFooter>
              <div className="flex gap-2">
                <Button color="primary" type="submit">
                  Вхід
                </Button>
                <Button type="reset" variant="flat">
                  Скинути
                </Button>
              </div>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
