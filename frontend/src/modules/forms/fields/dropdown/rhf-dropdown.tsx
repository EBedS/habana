import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    useFormContext,
} from 'react-hook-form';
import { MultiValue, SingleValue } from 'react-select';

import DropdownField, { DropdownFieldProps, SimpleOptionDropdown } from './dropdown';

export type RHFDropdownProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
    name: ControllerProps<TFieldValues, TName>['name'];
    required?: boolean;
    defaultValue?: ControllerProps<TFieldValues, TName>['defaultValue'];
    valueTransformer?: <T>(
        value: MultiValue<SimpleOptionDropdown> | SingleValue<SimpleOptionDropdown>
    ) => T;
    onChange?: () => void;
} & Omit<DropdownFieldProps, 'onChange' | 'name' | 'value' | 'defaultValue'>;

const RHFDropdown = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    name,
    required,
    defaultValue,
    onChange: externOnChange,
    valueTransformer,
    ...rest
}: RHFDropdownProps<TFieldValues, TName>) => {
    const { control } = useFormContext<TFieldValues>();

    return (
        <Controller<TFieldValues, TName>
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => {
                return (
                    <DropdownField
                        name={name}
                        onChange={(value) => {
                            if (valueTransformer) {
                                const transformedValue = valueTransformer(value);
                                onChange(transformedValue);
                            } else {
                                onChange((value as SimpleOptionDropdown).value);
                            }

                            if (externOnChange) {
                                externOnChange();
                            }
                        }}
                        value={value}
                        {...rest}
                    />
                );
            }}
            rules={{
                required,
            }}
        />
    );
};

export default RHFDropdown;
