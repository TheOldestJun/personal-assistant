import { useState } from "react";

import { Popover, PopoverTrigger, PopoverContent, Button, Image } from "@heroui/react";
import ActionsMenu from "./actionsMenu";

export default function ActionsPopover({ data }) {
    const [order, setOrder] = useState(false);
    const [received, setReceived] = useState(false);

    return (
        <Popover placement="bottom" showArrow={true} backdrop="opaque">
            <PopoverTrigger>
                <Image src="/call-to-action.png" alt="More" width={20} height={20} />

            </PopoverTrigger>
            <PopoverContent className="p-2">
                <div className="">
                    <div className="text-center">{data.label}</div>
                    {data.color == 'rail' ? <div className='text-sm text-center text-red-500 font-bold'>Це ТМЦ для ЗЦ</div> : ''}
                    <Button variant="flat" color='secondary' className="w-full my-2" onPress={() => setOrder(!order)}>Плануємо</Button>
                    {order && <ActionsMenu data={data} quantity={data.gok} action='order' />}
                    <Button variant="flat" color='warning' className="w-full my-2" onPress={() => setReceived(!received)}>Отримали</Button>
                    {received && <ActionsMenu data={data} quantity={data.order} action='ferro' />}
                </div>
            </PopoverContent>
        </Popover>
    );
}