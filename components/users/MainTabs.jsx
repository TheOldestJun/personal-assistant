import { Tabs, Tab, Card, CardBody } from '@heroui/react';
import { KitchenTab, SupplyTab, WaterTab } from './index';

const allTabs = [
  {
    key: 'kitchen',
    title: 'Кухня',
    required: 'kitchen_all',
    component: <KitchenTab />,
  },
  {
    key: 'supply',
    title: 'Забезпечення',
    required: 'supply_all',
    component: <SupplyTab />,
  },
  {
    key: 'water',
    title: 'Вода',
    required: 'water_all',
    component: <WaterTab />,
  },
];
export default function MainTabs({ permissions }) {
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
