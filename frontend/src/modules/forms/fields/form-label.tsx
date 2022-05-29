type Props = {
    htmlFor: string;
    children: string;
    isRequired: boolean;
};

const FormLabel: React.FC<Props> = ({ htmlFor, children, isRequired }) => (
    <label htmlFor={htmlFor} className="inline-block text-lg text-gray-800">
        {children}

        {isRequired && (
            <span className="ml-1 text-red-500" aria-hidden="true" role="presentation">
                *
            </span>
        )}
    </label>
);

export default FormLabel;
