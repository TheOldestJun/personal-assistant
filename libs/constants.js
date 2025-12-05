
export const permissionsTree = [
  {
    key: 'ADMIN',
    title: 'Адміністратор',
  },
  {
    key: 'KITCHEN_ALL',
    title: 'Кухня',
  },
  {
    key: 'SUPPLY_ALL',
    title: 'Забезпечення',
    children: [
      { key: 'SUPPLY_ORDERERS', title: 'Замовники' },
      { key: 'SUPPLY_EXECUTORS', title: 'Виконавці' },
      { 
        key: 'SUPPLY_WAREHOUSE', 
        title: 'Склад',
        children: [
          { key: 'SUPPLY_WAREHOUSE_SAFEKEEPING', title: 'Відповідальне зберігання' },
          { key: 'SUPPLY_WAREHOUSE_RESERVED', title: 'Залишки по ГЗК' },
        ]},
    ],
  },
  {
    key: 'WATER_ALL',
    title: 'Вода',
  },
];