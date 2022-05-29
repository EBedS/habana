import dynamic from 'next/dynamic';

import {
    FormByIdForEditQuery,
    FormFieldTypeChoices,
    FormRepeatableMetaTypeChoices,
} from '../../../api/graphql';
import Input from './input/input';
import SwitchField from './switch/switch';

const CheckboxField = dynamic(() => import('./checkbox/checkbox'));
const DateTimePickerField = dynamic(() => import('./datepicker/datepicker'));
const Dropdown = dynamic(() => import('./dropdown/dropdown'));
const PhoneNumberField = dynamic(() => import('./phone-number/phone-number'));
const Textarea = dynamic(() => import('./textarea/textarea'));

type RadioBoxOption = {
    label: string;
    value: string;
    enablesFreeOption: boolean;
};

type RadioBoxFieldItemProps = {
    option: RadioBoxOption;
};

const RadioBoxFieldItem: React.FC<RadioBoxFieldItemProps> = ({ option }) => (
    <li className="flex items-center justify-between cursor-pointer w-full max-w-[400px]">
        <span className="px-4 py-0.5 bg-gray-200 rounded-full w-full">
            {option.label}
        </span>

        <label className="flex items-center pl-8 w-[25rem]">
            <span className="mr-2 text-xs text-gray-700">Respuesta libre</span>

            <SwitchField
                checked={option.enablesFreeOption}
                onChange={() => {
                    //
                }}
                id={option.value}
            />
        </label>
    </li>
);

type Props = {
    field: Pick<
        ArrayElement<
            ArrayElement<
                NonNullable<FormByIdForEditQuery['formById']>['sections']
            >['fields']
        >,
        'id' | 'repeatableMeta' | 'isRequired' | 'title' | 'type' | 'placeholder'
    >;
};

const FormFieldPreview: React.FC<Props> = ({ field }) => {
    const commonProps = {
        id: field.id,
        name: field.id,
        required: field.isRequired,
    };

    const options = field.repeatableMeta
        .filter((meta) => meta.type === FormRepeatableMetaTypeChoices.Option)
        .map((meta) => ({
            label: meta.value,
            value: meta.id,
            enablesFreeOption: meta.enablesFreeOption,
        }));

    switch (field.type) {
        case FormFieldTypeChoices.Checkbox: {
            return <CheckboxField options={options} {...commonProps} />;
        }
        case FormFieldTypeChoices.Date: {
            return <DateTimePickerField {...commonProps} />;
        }
        case FormFieldTypeChoices.Dropdown: {
            return (
                <div>
                    <Dropdown options={options} {...commonProps} />

                    <ul className="flex flex-col items-start pt-3 space-y-3 text-xs">
                        {options.map((option) => {
                            return (
                                <li
                                    key={option.value}
                                    className="flex items-center justify-between cursor-pointer w-full max-w-[400px]"
                                >
                                    <span className="px-4 py-0.5 bg-gray-200 rounded-full w-full">
                                        {option.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }
        case FormFieldTypeChoices.RadioBox: {
            return (
                <ul className="flex flex-col items-start space-y-3 text-xs">
                    {options.map((option) => (
                        <RadioBoxFieldItem key={option.value} option={option} />
                    ))}
                </ul>
            );
        }
        case FormFieldTypeChoices.Text: {
            return <Input {...commonProps} />;
        }
        case FormFieldTypeChoices.Email: {
            return <Input type="email" {...commonProps} />;
        }
        case FormFieldTypeChoices.Textarea: {
            return <Textarea {...commonProps} />;
        }
        case FormFieldTypeChoices.Telephone: {
            return <PhoneNumberField {...commonProps} />;
        }
        default:
            return null;
    }
};

export default FormFieldPreview;
