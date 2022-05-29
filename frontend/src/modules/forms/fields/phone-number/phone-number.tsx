import countryCodes from 'country-codes-list';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

import DropdownField, { DropdownFieldProps } from '../dropdown/dropdown';
import InputField, { InputFieldProps } from '../input/input';

const countries = countryCodes.customList(
    'countryCode',
    '{countryNameEn} +{countryCallingCode}'
);

const countriesOptions = Object.keys(countries).map((key) => {
    const splitted = countries[key].split(' +');
    const countryName = splitted[0];
    const countryCode = splitted[1];

    return {
        label: `${getUnicodeFlagIcon(key)} ${countryName} +${countryCode}`,
        value: countryCode,
    };
});

type Props = {
    name: string;
    countryCodeProps?: Omit<DropdownFieldProps, 'options'>;
    numberProps?: Omit<InputFieldProps, 'id'>;
};

const PhoneNumberField: React.FC<Props> = ({ name, countryCodeProps, numberProps }) => (
    <div>
        <div className="mb-3">
            <label
                htmlFor={`${name}-country-code`}
                className="inline-block mb-2.5 text-black text-sm font-medium"
            >
                Código de país
            </label>

            <DropdownField
                name={`${name}-country-code`}
                options={countriesOptions}
                {...countryCodeProps}
            />
        </div>

        <div>
            <label
                htmlFor={`${name}`}
                className="inline-block mb-2.5 text-black text-sm font-medium"
            >
                Número
            </label>

            <InputField
                name={`${name}`}
                id={`${name}`}
                type="text"
                className="block w-full px-2 py-2 m-0 text-gray-700 transition ease-in-out bg-white border-2 border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                {...numberProps}
            />
        </div>
    </div>
);

export default PhoneNumberField;
