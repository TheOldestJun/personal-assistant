import { Tabs, Tab } from '@heroui/react';
import { KitchenTab, SupplyTab, WaterTab } from './index';

const allTabs = [
  {
    key: 'kitchen',
    title: 'Кухня',
    required: 'kitchen_all',
    component: (permissions) => <KitchenTab permissions={permissions} />,
  },
  {
    key: 'supply',
    title: 'Забезпечення',
    required: 'supply_all',
    component: (permissions) => <SupplyTab permissions={permissions} />,
  },
  {
    key: 'water',
    title: 'Вода',
    required: 'water_all',
    component: (permissions) => <WaterTab permissions={permissions} />,
  },
];
export default function MainTabs({ permissions }) {
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