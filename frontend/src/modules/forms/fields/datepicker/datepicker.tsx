import 'flatpickr/dist/themes/airbnb.css';

import { Spanish } from 'flatpickr/dist/l10n/es';
import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';

export type DateTimePickerFieldProps = Omit<DateTimePickerProps, 'name'> & {
    name: DateTimePickerProps['name'];
};

const defaultOptions = {
    locale: Spanish,
    dateFormat: 'd-m-Y',
};

const DateTimePickerField: React.FC<DateTimePickerFieldProps> = ({
    options = defaultOptions,
    placeholder = 'dd-mm-yyyy',
    ...rest
}) => (
    <Flatpickr
        className="block w-full p-3 text-gray-700 transition ease-in-out bg-white border-2 border-gray-300 rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={placeholder}
        options={options}
        {...rest}
    />
);

export default DateTimePickerField;
