import { FieldValues, Path, useFormContext } from 'react-hook-form';

import InputField, { InputFieldProps } from './input';

export type RHFInputProps<T extends FieldValues> = {
    name: Path<T>;
    required?: boolean;
} & Omit<InputFieldProps, 'id'>;

const RHFInput = <T extends FieldValues>({
    name,
    required,
    type,
    ...rest
}: RHFInputProps<T>) => {
    const { register } = useFormContext<T>();

    return (
        <InputField
            id={name}
            type={type}
            {...rest}
            {...register(name, {
                required,
                pattern: type === 'email' ? /^[^@]+@[^@]+\.[^@]+$/g : undefined,
            })}
        />
    );
};

export default RHFInput;
