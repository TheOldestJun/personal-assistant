import CreatableSelect from 'react-select/creatable';

export default function ComboBox({
  placeholder,
  className,
  options,
  value,
  onCreateOption,
  onSelectedOption,
  isDisabled,
}) {
  return (
    <CreatableSelect
      isDisabled={isDisabled}
      isClearable
      unstyled
      noOptionsMessage={() => 'Нічого не знайдено'}
      placeholder={placeholder}
      onChange={value => onSelectedOption(value)}
      onCreateOption={value => onCreateOption(value)}
      options={options}
      value={value}
      createOptionPosition="last"
      formatCreateLabel={inputValue => `Створити "${inputValue}"?`}
      className={className}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
      menuShouldBlockScroll={false}
      styles={{
        menuPortal: base => ({ ...base, zIndex: 9999 }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          `@apply text-sm rounded-xl bg-gray-100 px-3 ${isFocused ? 'outline-none' : ''} !important`,
        placeholder: () =>
          `@apply text-sm px-3 text-muted-foreground !important`,
        menu: () =>
          `@apply w-full !important bg-card mt-2 rounded-xl bg-white text-left text-sm border border-gray-200 !important`,
        menuList: () =>
          `@apply overflow-y-scroll no-scrollbar mt-2 bg-white rounded-xl !important z-50`,
        option: () => `@apply hover:bg-gray-100 pl-2 mb-2 !important`,
      }}
    />
  );
}