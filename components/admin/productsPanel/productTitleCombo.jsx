import ComboBox from '@/components/custom/comboBox';
import { useGetAllProductsQuery } from '@/store/services/products';

export default function ProductTitleCombo({ handleSelected, handleCreate, className, value }) {
    const { data, isLoading, error } = useGetAllProductsQuery();

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const options = data?.map(product => ({
        label: `${product.title} - (${product.units.title})`, // product.title,
        value: product.id,
    }));

    return (
        <ComboBox
            options={options}
            onSelectedOption={handleSelected}
            onCreateOption={handleCreate}
            className={className}
            placeholder="Оберіть товар"
            value={value}
        />
    );
}