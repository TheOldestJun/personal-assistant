import { useState } from 'react';

import ComboBox from '@/components/custom/comboBox';
import InputSkeleton from '@/components/custom/inputSkeleton';
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '@/store/services/products';
import { addToast, Button } from '@heroui/react';
import EditButton from './editButton';

export default function EditProductTitle() {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [value, setValue] = useState(null);
  if (isLoading) return <InputSkeleton />
  if (error) return <div>Error: {error.message}</div>;

  const options = data?.map(product => ({
    label: product.title,
    value: product.id,
  }));

  const handleCreate = async value => {
    try {
      const response = await createProduct({ title: value.toUpperCase() });
      if (response) {
        addToast({
          title: 'ТМЦ успішно створено',
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
    try {
      const response = await deleteProduct(value.value);
      if (response) {
        addToast({
          title: 'ТМЦ успішно видалено',
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
    <div>
      <ComboBox
        options={options}
        placeholder="Оберіть..."
        onSelectedOption={async value => {
          setValue(value);
        }}
        onCreateOption={value => handleCreate(value)}
      />

      {value && (
        <div>
          <EditButton value={value} />
          <Button color="danger" onPress={handleDelete} className="mt-2 w-full">
            Видалити
          </Button>
        </div>
      )}
    </div>
  );
}