import { Controller, Path, useFormContext } from 'react-hook-form';

import DateTimePickerField, { DateTimePickerFieldProps } from './datepicker';

type CustomFieldValues = {
    [x: string]: DateTimePickerFieldProps['value'];
};

type Props<T extends CustomFieldValues> = {
    name: Path<T>;
    required?: boolean;
} & Omit<DateTimePickerFieldProps, 'onChange'>;

const RHFDateTimePickerField = <T extends CustomFieldValues>({
    name,
    required,
    ...rest
}: Props<T>) => {
    const { control } = useFormContext<T>();

    return (
        <Controller<T>
            control={control}
            name={name}
            rules={{
                required,
            }}
            render={({ field: { onChange, value } }) => (
                <DateTimePickerField
                    name={name}
                    value={value}
                    onChange={onChange}
                    options={{
                        dateFormat: 'Y-M-D',
                    }}
                    {...rest}
                />
            )}
        />
    );
};

export default RHFDateTimePickerField;
