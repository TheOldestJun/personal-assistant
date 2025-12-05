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
    getKeyValue
} from '@heroui/react';

const columns = [
    { name: "Код ТМЦ", uid: "code" },
    { name: "Найменування", uid: "name" },
    { name: "Од. вим.", uid: "units" },
    { name: "К-ть", uid: "quantity" },
    { name: "ГЗК", uid: "gok" },
    { name: "Ферротранс", uid: "ferro" },
    { name: "Замовити", uid: "order" },
];

export default function Safekeeping() {

    const { data, isLoading, error } = useGetAllSafekeepingQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(data[0]);

    return (
        <Card>
            <CardBody>
                <Table>
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
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