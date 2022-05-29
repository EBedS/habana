import { Controller, Path, useFormContext } from 'react-hook-form';

import RadioBoxField, { RadioBoxFieldProps } from './radiobox';

type CustomFieldValues = {
    [x: string]: RadioBoxFieldProps['value'];
};

type Props<T extends CustomFieldValues> = {
    name: Path<T>;
    required?: boolean;
} & Omit<RadioBoxFieldProps, 'onChange' | 'id' | 'value'>;

const RHFRadioBoxField = <T extends CustomFieldValues>({
    name,
    required,
    ...rest
}: Props<T>) => {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required,
            }}
            render={({ field: { onChange, value } }) => (
                <RadioBoxField value={value} id={name} onChange={onChange} {...rest} />
            )}
        />
    );
};

export default RHFRadioBoxField;
