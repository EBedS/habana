import { FieldValues, Path, useFormContext } from 'react-hook-form';

import TextareaField, { TextareaFieldProps } from './textarea';

export type RHFTextareaFieldProps<T extends FieldValues> = {
    name: Path<T>;
    required?: boolean;
} & Omit<TextareaFieldProps, 'id'>;

const RHFTextarea = <T extends FieldValues>({
    name,
    required,
    ...rest
}: RHFTextareaFieldProps<T>) => {
    const { register } = useFormContext<T>();

    return (
        <TextareaField
            id={name}
            {...rest}
            {...register(name, {
                required,
            })}
        />
    );
};

export default RHFTextarea;
