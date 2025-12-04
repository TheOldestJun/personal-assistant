import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import EditProduct from './productsPanel/editProduct';

export default function ProductsPanel() {
  return (
    <Card>
      <CardBody>
        <Tabs aria-label="Products panel" variant="underlined">
          <Tab key="edit" title="Редагування">
            <EditProduct />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
