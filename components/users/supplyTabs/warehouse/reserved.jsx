import { useMemo, useState } from 'react';

import { useGetAllReservedQuery } from '@/store/services/reserved';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue
} from '@heroui/react';
import UpdateBlock from './reserved/updateBlock';

const columns = [
  { label: 'Код ТМЦ', key: 'code', sortable: true },
  { label: 'Найменування', key: 'name', sortable: true },
  { label: 'Од. вим.', key: 'unit' },
  { label: 'К-ть', key: 'qty' },
  { label: 'Сума', key: 'sum' },
];

export default function Reserved() {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'name',
    direction: 'ascending',
  });
  const { data, isLoading, error } = useGetAllReservedQuery();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error.message}</div>;

  const rows = useMemo(
    () =>
      data?.map(row => ({
        key: row.id,
        code: row.code,
        name: row.name,
        unit: row.unit,
        qty: row.qty,
        sum: row.sum,
        color: row.notes,
      })),
    [data],
  );

  const sortedItems = useMemo(() => {
    return rows.sort((a, b) => {
      const first = getKeyValue(a, sortDescriptor.column);
      const second = getKeyValue(b, sortDescriptor.column);
      const cmp = String(first).localeCompare(String(second), 'ru', {
        numeric: true,
      });
      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, rows]);

  return (
    <Card>
      <CardHeader >
        <UpdateBlock className='' />

      </CardHeader>

      <CardBody>
        <Table
          aria-label="safekeeping table"
          selectionMode="single"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="min-w-3xl"
          isStriped
          isCompact
          radius="none"
        >
          <TableHeader columns={columns}>
            {column => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedItems}>
            {(item) => (
              <TableRow key={item.key} className={`hover:bg-blue-300 ${item.color === 'rail' ? 'bg-red-300' : ''}`} >
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}