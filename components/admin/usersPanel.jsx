import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import DeleteUser from './usersPanel/deleteUser';
import NewUser from './usersPanel/newUser';

export default function UsersPanel() {
    return (
        <Card>
            <CardBody>
                <Tabs aria-label="Users panel" variant="underlined">
                    <Tab key="new" title="Новий">
                        <NewUser />
                    </Tab>
                    <Tab key="edit" title="Редагування">
                        <h1>Редагування</h1>
                    </Tab>
                    <Tab key="delete" title="Видалення">
                        <DeleteUser />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
}