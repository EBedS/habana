import {
    Controller,
    FieldPath,
    FieldPathValue,
    FieldValues,
    UnpackNestedValue,
    useFormContext,
} from 'react-hook-form';

import SwitchField, { SwitchFieldProps } from './switch';

type Props<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: TName;
    required?: boolean;
    defaultValue?: UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
    onChange?: (checked: boolean) => void;
} & Omit<SwitchFieldProps, 'checked' | 'onChange'>;

const RHFSwitch = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    required,
    defaultValue,
    onChange: externOnChange,
    ...rest
}: Props<TFieldValues, TName>) => {
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller<TFieldValues, TName>
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
                <SwitchField
                    checked={value}
                    onChange={(checked) => {
                        onChange(checked);

                        if (externOnChange) {
                            externOnChange(checked);
                        }
                    }}
                    {...rest}
                />
            )}
            rules={{
                required,
            }}
        />
    );
};

export default RHFSwitch;
