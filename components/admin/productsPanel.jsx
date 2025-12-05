import { Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react';
import EditProduct from './productsPanel/editProduct';
import ImportSafekeeping from './productsPanel/importSafekeeping';

export default function ProductsPanel() {
  return (
    <Card>
      <CardBody>
        <Tabs aria-label="Products panel" variant="underlined">
          <Tab key="edit" title="Редагування">
            <EditProduct />
          </Tab>
          <Tab key="safekeeping" title="Відповідальне зберігання">
            <ImportSafekeeping />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}