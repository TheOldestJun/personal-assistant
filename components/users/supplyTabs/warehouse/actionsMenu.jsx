import { Card, CardBody, Input } from '@heroui/react';

export default function ActionsMenu({ data }) {
    console.log(data)
    return (
        <Card className=''>
            <CardBody>
                <div className='flex items-center'>
                    <div>Кількість: </div>
                    <Input defaultValue={data.gok} className='ml-2 w-26' />
                </div>
            </CardBody>
        </Card>
    );
}