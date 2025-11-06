import { Tabs, Tab, Card, CardBody } from '@heroui/react';

export default function AdminPanel() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs aria-label="Admin panel" variant="underlined">
        <Tab key="product" title="Products">
          <Card>
            <CardBody>Products</CardBody>
          </Card>
        </Tab>
        <Tab key="users" title="Users">
          <Card>
            <CardBody>Users</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}