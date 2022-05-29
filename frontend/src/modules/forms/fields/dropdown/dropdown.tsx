import Select, { GroupBase, Props as SelectProps, StylesConfig } from 'react-select';

export type SimpleOptionDropdown = {
    label: string | JSX.Element;
    value: string;
};

const optionsAreGroups = (
    options: SelectProps<SimpleOptionDropdown>['options']
): options is ReadonlyArray<GroupBase<SimpleOptionDropdown>> => {
    return !!options && options.length > 0 && 'options' in options[0];
};

const getSelectedValue = (
    value: SimpleOptionDropdown['value'],
    optionsOrGroups: SelectProps<SimpleOptionDropdown>['options']
): SelectProps<SimpleOptionDropdown>['value'] => {
    let selectedOption: SelectProps<SimpleOptionDropdown>['value'] = null;

    if (!optionsOrGroups || optionsOrGroups.length === 0) {
        return;
    }

    if (optionsAreGroups(optionsOrGroups)) {
        for (let i = 0; i < optionsOrGroups.length; i++) {
            const groupOptions = optionsOrGroups[i].options;
            selectedOption = groupOptions.find((option) => option.value === value);

            if (selectedOption) {
                break;
            }
        }
    } else {
        selectedOption = (optionsOrGroups as SimpleOptionDropdown[]).find(
            (option) => option.value === value
        );
    }

    return selectedOption;
};

export type DropdownFieldProps = Omit<
    SelectProps<SimpleOptionDropdown>,
    'value' | 'name' | 'defaultValue'
> & {
    name: SelectProps<SimpleOptionDropdown>['name'];
    value?: SimpleOptionDropdown['value'];
    defaultValue?: SimpleOptionDropdown['value'] | null;
};

const DropdownField: React.FC<DropdownFieldProps> = ({
    placeholder = 'Selecciona una opción',
    options,
    value,
    defaultValue,
    ...rest
}) => {
    const customStyles: StylesConfig<SimpleOptionDropdown> = {
        control: (provided) => ({
            ...provided,
            borderWidth: '2px',
            background: 'white',
            borderRadius: '0.25rem',
            padding: '0.125rem 0.5rem',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 1rem 0 0',
        }),
    };

    return (
        <Select
            styles={customStyles}
            placeholder={placeholder}
            options={options}
            value={value ? getSelectedValue(value, options) : null}
            defaultValue={defaultValue ? getSelectedValue(defaultValue, options) : null}
            {...rest}
        />
    );
};

export default DropdownField;
