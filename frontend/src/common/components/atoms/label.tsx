type Props = {
    htmlFor: string;
    children: string;
};

const Label: React.FC<Props> = ({ htmlFor, children }) => (
    <label
        htmlFor={htmlFor}
        className="inline-block mb-2 text-sm font-medium text-gray-800"
    >
        {children}
    </label>
);

export default Label;
