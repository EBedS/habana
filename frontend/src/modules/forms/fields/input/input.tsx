import { forwardRef } from 'react';

export type InputFieldProps = Omit<
    React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'id' | 'ref'
> & {
    id: string;
};

const classes =
    'block w-full p-3 text-gray-700 transition ease-in-out bg-white border-2 border-gray-300 rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ type = 'text', className = classes, ...rest }, ref) => (
        <input type={type} className={className} {...rest} ref={ref} />
    )
);

export default InputField;
