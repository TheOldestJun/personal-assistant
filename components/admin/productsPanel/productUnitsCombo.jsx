import ComboBox from '@/components/custom/comboBox';
import { useGetAllUnitsQuery, useGetByIdQuery } from '@/store/services/units';

export default function ProductUnitsCombo({ handleSelected, handleCreate, value, className, isDisabled }) {
    const { data, isLoading, error } = useGetAllUnitsQuery();

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const options = data?.map(unit => ({
        label: unit.title,
        value: unit.id,
    }));

    return (
        <ComboBox
            options={options}
            onSelectedOption={handleSelected}
            onCreateOption={handleCreate}
            className={className}
            placeholder="Од.вим."
            value={value}
            isDisabled={isDisabled}
        />
    );
}