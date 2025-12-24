import { useState } from 'react';

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
  Divider
} from '@heroui/react';
import UpdateBlock from './reserved/updateBlock';

const columns = [
  { label: 'Код ТМЦ', key: 'code', sortable: true },
  { label: 'Найменування', key: 'name', sortable: true },
  { label: 'К-ть', key: 'qty' },
  { label: 'Сума', key: 'sum' },
];

export default function Reserved() {

  const { data, isLoading, error } = useGetAllReservedQuery();

  return (
    <Card>
      <CardHeader>
        <UpdateBlock />

      </CardHeader>

      <CardBody>
        <Table
          aria-label="safekeeping table"
          selectionMode="single"
          /* sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor} */
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
          <TableBody>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}