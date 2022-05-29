import { Controller, Path, useFormContext } from 'react-hook-form';

import CheckboxField, { CheckboxFieldProps } from './checkbox';

type CustomFieldValues = {
    [x: string]: CheckboxFieldProps['value'];
};

type Props<T extends CustomFieldValues> = {
    name: Path<T>;
    required?: boolean;
} & Omit<CheckboxFieldProps, 'onChange' | 'id' | 'value'>;

const RHFCheckboxField = <T extends CustomFieldValues>({
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
                <CheckboxField value={value} id={name} onChange={onChange} {...rest} />
            )}
        />
    );
};

export default RHFCheckboxField;
