import { useState } from 'react';

import { useEditSafekeepingMutation } from '@/store/services/safekeeping';
import { Card, CardBody, Input, Button, addToast } from '@heroui/react';

export default function ActionsMenu({ data, quantity, action }) {
  console.log(data);
  const [value, setValue] = useState(null);
  const [editSafekeeping] = useEditSafekeepingMutation();

  const handleSave = async () => {
    data[action] = parseFloat(value);
    if (data[action] > quantity) {
      addToast({
        title: 'Помилка',
        description: 'Кількість не може бути більшою за загальну',
        status: 'error',
      });
      return;
    }
    try {
      const result = await editSafekeeping({ id: data.key, ...data });
    } catch (error) {
      addToast({
        title: 'Помилка',
        description: error.message,
        status: 'error',
      });
    }
  };
  return (
    <Card className="">
      <CardBody>
        <div className="flex items-center">
          <div>Кількість: </div>
          <Input
            defaultValue={quantity}
            className="ml-2 w-26"
            onValueChange={setValue}
          />
        </div>
        <Button
          variant="flat"
          color="success"
          className="my-2 w-full"
          onPress={handleSave}
        >
          Зберегти
        </Button>
      </CardBody>
    </Card>
  );
}
