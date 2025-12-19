import { Card, CardBody, Tabs, Tab } from '@heroui/react';
import EditProductTitle from './editProductTitle';
import EditUnitsTitle from './editUnitsTitle';

export default function EditProduct() {
  return (
    <Card className="w-full max-w-md">
      <CardBody>
        <Tabs aria-label="Products edit panel" variant="underlined">
          <Tab key="edit product" title="назви ТМЦ">
            <EditProductTitle />
          </Tab>
          <Tab key="edit units" title="одиниць виміру">
            <EditUnitsTitle />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
