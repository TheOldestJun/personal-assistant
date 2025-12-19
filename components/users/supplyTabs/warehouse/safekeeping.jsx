import { useMemo, useState } from 'react';

import { useGetAllSafekeepingQuery } from '@/store/services/safekeeping';
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from '@heroui/react';
import ActionsPopover from './actionsPopover';

const columns = [
  { label: 'Код ТМЦ', key: 'code', sortable: true },
  { label: 'Найменування', key: 'label', sortable: true },
  { label: 'Од. вим.', key: 'units' },
  { label: 'К-ть', key: 'quantity' },
  { label: 'ГЗК', key: 'gok' },
  { label: 'Ферротранс', key: 'ferro' },
  { label: 'Замовити', key: 'order' },
  { label: 'Дії', key: 'actions' },
];

export default function Safekeeping() {
  const { data, isLoading, error } = useGetAllSafekeepingQuery();
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'label',
    direction: 'ascending',
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  const renderCell = useCallback((rowData, columnKey) => {
    const value = getKeyValue(rowData, columnKey);
    switch (columnKey) {
      case 'actions':
        return (
          <ActionsPopover id={rowData.key} />
        )
      default:
        return value;
    }
  }, []);

  const rows = useMemo(() => data?.map(row => ({
    key: row.id,
    code: row.code,
    label: row.name,
    units: row.units,
    quantity: row.quantity,
    gok: row.gok,
    ferro: row.ferro,
    order: row.order,
    color: row.notes
  })), [data]);

  const sortedItems = useMemo(() => {
    return rows.sort((a, b) => {
      const first = getKeyValue(a, sortDescriptor.column);
      const second = getKeyValue(b, sortDescriptor.column);
      const cmp = String(first).localeCompare(String(second), 'ru', { numeric: true });
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;

    });
  }, [sortDescriptor, rows]);

  return (
    <Card>
      <CardBody>
        <Table
          aria-label="safekeeping table"
          selectionMode="single"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className='min-w-3xl'
          isStriped
          isCompact
          radius='none'
        >
          <TableHeader columns={columns}>
            {column => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {item => (
              <TableRow key={item.key} className={`hover:bg-blue-300 ${item.color === "rail" ? "bg-red-300" : ""}`}>
                {columnKey => (
                  <TableCell>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}