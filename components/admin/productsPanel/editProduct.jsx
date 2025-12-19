import { useState } from 'react';
import axios from 'axios';

import ComboBox from '@/components/custom/comboBox';
import {
  useGetAllProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '@/store/services/products';
import {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useDeleteUnitMutation
} from '@/store/services/units';
import { Card, CardBody, Input, Button, addToast } from '@heroui/react';
import ProductTitleCombo from './productTitleCombo';
import ProductUnitsCombo from './productUnitsCombo';

export default function EditProduct() {

  const [product, setProduct] = useState(null);
  const [units, setUnits] = useState(null);
  /*    const { data, isLoading, error } = useGetAllProductsQuery();
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
      })); */

  const handleSelectedProduct = async value => {
    console.log(value);
    setProduct(value);
    const { data } = await axios.get(`/api/supply/units/get-by-id?id=${value.value}`);
    console.log(data);
    setUnits(data);
  };

  const handleSelectedUnit = value => {
    console.log(value);
    setUnits(value);
  };

  /*     const handleEdit = async () => {
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
      }; */

  const handleCreateTitle = async value => {
    setProduct(value);
    setUnits(null);
    console.log(value);
  };

  const handleCreateUnit = async value => {
    console.log(value);
    setUnits(value);
  };

  /*     const handleDelete = async () => {
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
      }; */

  return (
    <Card className="w-2xs md:w-2xl">
      <CardBody>
        <div className="relative flex w-full flex-col gap-2 md:flex-row">
          <ProductTitleCombo
            handleSelected={handleSelectedProduct}
            handleCreate={handleCreateTitle}
            className="flex-1"
            value={product}
          />
          <ProductUnitsCombo
            handleSelected={handleSelectedUnit}
            handleCreate={handleCreateUnit}
            className="w-full md:w-28"
            isDisabled={!product}
            value={units}
          />
          {/*           <Input
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
          /> */}
        </div>
        {
          (product && units) && <Button>Створити</Button>
        }
        {/*         <Button
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
        </Button> */}
      </CardBody>
    </Card>
  );
}