import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import ProductsPanel from './productsPanel';
import UsersPanel from './usersPanel';

export default function AdminPanel() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs aria-label="Admin panel" variant="underlined">
        <Tab key="product" title="ТМЦ">
          <ProductsPanel />
        </Tab>
        <Tab key="users" title="Користувачі">
          <UsersPanel />
        </Tab>
      </Tabs>
    </div>
  );
}