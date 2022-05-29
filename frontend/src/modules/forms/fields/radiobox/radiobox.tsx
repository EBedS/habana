import clsx from 'clsx';
import { useEffect, useState } from 'react';

type RadioBoxOption = {
    label: string;
    value: string;
};

type RadioBoxFieldItemProps = {
    option: RadioBoxOption;
    isSelected: boolean;
    onClick: () => void;
};

const RadioBoxFieldItem: React.FC<RadioBoxFieldItemProps> = ({
    option,
    isSelected,
    onClick,
}) => (
    <li className="inline-flex items-center cursor-pointer" onClick={onClick}>
        <div className="inline-block mr-4 border-2 p-0.5 rounded-full">
            <div
                className={clsx(
                    'p-1.5 w-full block rounded-full',
                    isSelected && 'bg-blue-300'
                )}
            />
        </div>
        <span className="px-4 py-0.5 bg-gray-200 rounded-full">{option.label}</span>
    </li>
);

type Value = RadioBoxOption['value'] | null;
type Options = ReadonlyArray<RadioBoxOption>;

export type RadioBoxFieldProps = {
    id: string;
    value?: Value;
    options: Options;
    onChange?: (selectedOptions: Value) => void;
};

const RadioBoxField: React.FC<RadioBoxFieldProps> = ({
    value = null,
    id,
    options,
    onChange,
}) => {
    const [selectedOption, setSelectedOption] = useState<Value>(value);

    useEffect(() => {
        if (!onChange) return;
        onChange(selectedOption);
    }, [selectedOption, onChange]);

    const onOptionClick = (value: RadioBoxOption['value']) => {
        setSelectedOption((prev) => {
            if (prev === value) {
                return null;
            }

            return value;
        });
    };

    return (
        <ul className="flex flex-col items-start space-y-3 text-xs" id={id}>
            {options.map((option) => (
                <RadioBoxFieldItem
                    key={option.value}
                    option={option}
                    onClick={() => onOptionClick(option.value)}
                    isSelected={selectedOption === option.value}
                />
            ))}
        </ul>
    );
};

export default RadioBoxField;
