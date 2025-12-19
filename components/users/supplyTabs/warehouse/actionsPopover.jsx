import { Popover, PopoverTrigger, PopoverContent, Button, Image } from "@heroui/react";

export default function ActionsPopover({ id }) {
    return (
        <Popover placement="bottom" showArrow={true}>
            <PopoverTrigger>
                <Image src="/call-to-action.png" alt="More" width={20} height={20} />

            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <Button variant="flat" color='secondary' className="w-full my-2">Плануємо</Button>
                    <Button variant="flat" color='success' className="w-full">Отримали</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}