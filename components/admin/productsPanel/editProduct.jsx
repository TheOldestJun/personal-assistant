import { useState } from 'react';

import ComboBox from '@/components/custom/comboBox';
import {
  useGetAllProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '@/store/services/products';
import { Card, CardBody, Input, Button, addToast } from '@heroui/react';

export default function EditProduct() {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [editProduct] = useEditProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [units, setUnits] = useState('');
  const [selected, setSelected] = useState(null);

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const options = data?.map(product => ({
    label: product.title,
    value: product.id,
  }));

  const handleSelected = value => {
    console.log(value);
    if (value) {
      setSelected(value);
      setUnits(data.find(product => product.id === value.value).units);
    } else {
      setSelected(null);
      setUnits('');
    }
  };

  const handleEdit = async () => {
    try {
      const response = await editProduct({
        id: selected.value,
        title: selected.label,
        units,
      });
      if (response) {
        addToast({
          title: 'Товар успішно редаговано',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        title: 'Помилка',
        description: error.message,
        color: 'danger',
      });
    }
  };

  const handleCreate = async value => {
    if (!units) {
      addToast({
        title: 'Помилка',
        description: 'Вкажіть одиниці виміру',
        color: 'danger',
      });
      return;
    }
    try {
      const response = await createProduct({
        title: value,
        units,
      });
      if (response) {
        addToast({
          title: 'Товар успішно створено',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        title: 'Помилка',
        description: error.message,
        color: 'danger',
      });
    }
  };

  const handleDelete = async () => {
    console.log(selected);
    try {
      const response = await deleteProduct(selected.value);
      console.log(response);
      if (response) {
        addToast({
          title: 'Товар успішно видалено',
          type: 'success',
        });
      }
    } catch (error) {
      addToast({
        title: 'Помилка',
        description: error.message,
        color: 'danger',
      });
    }
  };

  return (
    <Card className="w-2xs md:w-2xl">
      <CardBody>
        <div className="relative flex w-full flex-col gap-2 md:flex-row">
          <Input
            placeholder="Од. вим."
            className="w-full md:w-28"
            value={units}
            onChange={e => setUnits(e.target.value)}
          />
          <ComboBox
            options={options}
            onSelectedOption={handleSelected}
            onCreateOption={handleCreate}
            className="flex-1"
            placeholder="Оберіть товар"
            value={selected}
          />
        </div>
        <Button
          isDisabled={!selected}
          className="mt-4"
          color="primary"
          onPress={handleEdit}
        >
          Редагувати
        </Button>
        <Button
          isDisabled={!selected}
          className="mt-4"
          color="danger"
          onPress={handleDelete}
        >
          Видалити
        </Button>
      </CardBody>
    </Card>
  );
}
