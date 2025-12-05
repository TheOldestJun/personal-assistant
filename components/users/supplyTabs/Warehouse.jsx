import { Card, CardBody, Tabs, Tab } from '@heroui/react';
import Reserved from './warehouse/reserved';
import Safekeeping from './warehouse/safekeeping';

const allTabs = [
  {
    key: 'safekeeping',
    title: 'Відповідальне зберігання',
    required: 'supply_warehouse_safekeeping',
    component: <Safekeeping />,
  },
  {
    key: 'reserved',
    title: 'Залишки по ГЗК',
    required: 'supply_warehouse_reserved',
    component: <Reserved />,
  },
];

export default function Warehouse({ permissions }) {
  const visibleTabs = allTabs.filter(tab => permissions.includes(tab.required));
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs aria-label="Main options" variant="underlined">
        {visibleTabs.map(tab => (
          <Tab key={tab.key} title={tab.title}>
            {tab.component}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
