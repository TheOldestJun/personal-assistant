import { Tabs, Tab } from '@heroui/react';
import { Warehouse, Orderers, Executors } from './supplyTabs';

const allTabs = [
  {
    key: 'warehouse',
    title: 'Склад',
    required: 'supply_warehouse',
    component: permissions => <Warehouse permissions={permissions} />,
  },
  {
    key: 'executors',
    title: 'Виконавці',
    required: 'supply_executors',
    component: permissions => <Executors permissions={permissions} />,
  },
  {
    key: 'orderers',
    title: 'Замовники',
    required: 'supply_orderers',
    component: permissions => <Orderers permissions={permissions} />,
  },
];

export default function SupplyTab({ permissions }) {
  const visibleTabs = allTabs.filter(tab => permissions.includes(tab.required));
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs aria-label="Main options" variant="underlined">
        {visibleTabs.map(tab => (
          <Tab key={tab.key} title={tab.title}>
            {tab.component(permissions)}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}