import countryCodes from 'country-codes-list';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { FieldValues } from 'react-hook-form';

import RHFDropdown, { RHFDropdownProps } from '../dropdown/rhf-dropdown';
import RHFInput, { RHFInputProps } from '../input/rhf-input';

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

type Props<T extends FieldValues> = {
    name: string;
    countryCodeProps?: Omit<RHFDropdownProps<T>, 'options' | 'name'>;
    numberProps?: Omit<RHFInputProps<T>, 'name'>;
    required?: boolean;
};

const RHFPhoneNumberField = <T extends FieldValues>({
    name,
    countryCodeProps,
    numberProps,
    required,
}: Props<T>) => (
    <div>
        <div className="mb-3">
            <label
                htmlFor={`${name}-country-code`}
                className="inline-block mb-2.5 text-black text-sm font-medium"
            >
                Código de país
            </label>

            <RHFDropdown
                name={`${name}-country-code` as any}
                options={countriesOptions}
                {...countryCodeProps}
                required={required}
                defaultValue="56"
            />
        </div>

        <div>
            <label
                htmlFor={`${name}`}
                className="inline-block mb-2.5 text-black text-sm font-medium"
            >
                Número
            </label>

            <RHFInput
                name={`${name}`}
                type="text"
                className="block w-full px-2 py-2 m-0 text-gray-700 transition ease-in-out bg-white border-2 border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"
                {...numberProps}
                required={required}
            />
        </div>
    </div>
);

export default RHFPhoneNumberField;
