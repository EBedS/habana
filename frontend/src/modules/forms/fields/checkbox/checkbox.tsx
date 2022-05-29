import clsx from 'clsx';
import { useEffect, useState } from 'react';

type CheckboxOption = {
    label: string;
    value: string;
};

type CheckboxFieldItemProps = {
    option: CheckboxOption;
    isSelected: boolean;
    onClick: () => void;
};

const CheckboxFieldItem: React.FC<CheckboxFieldItemProps> = ({
    option,
    isSelected,
    onClick,
}) => (
    <li className="inline-flex items-center cursor-pointer" onClick={onClick}>
        <div className="inline-block mr-4 border-2 p-0.5">
            <div className={clsx('p-1.5 w-full block', isSelected && 'bg-blue-300')} />
        </div>
        <span className="px-4 py-0.5 bg-gray-200 rounded-full">{option.label}</span>
    </li>
);

type Value = ReadonlyArray<CheckboxOption['value']>;
type Options = ReadonlyArray<CheckboxOption>;

export type CheckboxFieldProps = {
    id: string;
    value?: Value;
    options: Options;
    onChange?: (selectedOptions: Value) => void;
};

const initialValue: Value = [];

const CheckboxField: React.FC<CheckboxFieldProps> = ({
    id,
    value = initialValue,
    options,
    onChange,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<Value>(value);

    useEffect(() => {
        if (!onChange) return;
        onChange(selectedOptions);
    }, [selectedOptions, onChange]);

    const onOptionClick = (value: CheckboxOption['value']) => {
        setSelectedOptions((prev) => {
            if (prev.includes(value)) {
                return prev.filter((somePrev) => somePrev !== value);
            }

            return [...prev, value];
        });
    };

    return (
        <ul className="flex flex-col items-start space-y-3 text-xs" id={id}>
            {options.map((option) => (
                <CheckboxFieldItem
                    key={option.value}
                    option={option}
                    onClick={() => onOptionClick(option.value)}
                    isSelected={selectedOptions.some(
                        (someValue) => someValue === option.value
                    )}
                />
            ))}
        </ul>
    );
};

export default CheckboxField;
