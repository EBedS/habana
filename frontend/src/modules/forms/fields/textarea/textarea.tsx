import { forwardRef } from 'react';

export type TextareaFieldProps = Omit<
    React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    >,
    'id'
> & {
    id: string;
};

const classes =
    'block w-full p-2 m-0 text-gray-700 transition ease-in-out bg-white border-2 border-gray-300 rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

// eslint-disable-next-line react/display-name
const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ rows = 3, className = classes, ...rest }, ref) => (
        <textarea rows={rows} className={className} {...rest} ref={ref} />
    )
);

export default TextareaField;
