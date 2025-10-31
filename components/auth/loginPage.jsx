import { useState } from "react";

import { Card, CardBody, CardHeader, CardFooter, Form, Input, Button } from "@heroui/react";

export default function LoginPage() {

    return (
        <div className="flex w-full h-full flex-col items-center justify-center mt-20">
            <Card className="max-w-sm">
                <CardHeader className="text-center">
                    <h1 className="text-3xl font-bold text-sky-800">Вхід</h1>
                </CardHeader>
                <CardBody>
                    <Form
                        className="w-full max-w-xs flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            let data = Object.fromEntries(new FormData(e.currentTarget));
                            console.log(data);
                        }}
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
                                    Submit
                                </Button>
                                <Button type="reset" variant="flat">
                                    Reset
                                </Button>
                            </div>
                        </CardFooter>
                    </Form>
                </CardBody>
            </Card>
        </div>


    )
}