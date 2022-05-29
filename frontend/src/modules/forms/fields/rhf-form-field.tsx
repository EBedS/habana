import dynamic from 'next/dynamic';

import { StageByIdField } from '@api/queries/useFieldsByStageIdQuery';

import RHFInput from './input/rhf-input';

const RHFCheckboxField = dynamic(() => import('./checkbox/rhf-checkbox'));
const RHFRadioBoxField = dynamic(() => import('./radiobox/rhf-radiobox'));
const RHFTextarea = dynamic(() => import('./textarea/rhf-textarea'));

type Props = {
    field: StageByIdField;
};

const RHFFormField: React.FC<Props> = ({ field }) => {
    const commonProps = {
        name: field.id.toString(),
        required: true,
    };

    switch (field.field_type) {
        case 1: {
            return <RHFInput {...commonProps} />;
        }
        case 2: {
            return <RHFTextarea {...commonProps} />;
        }
        case 3: {
            return <RHFRadioBoxField options={[]} {...commonProps} />;
        }
        case 4: {
            return (
                <div>
                    <RHFCheckboxField options={[]} {...commonProps} />
                </div>
            );
        }
        default:
            return null;
    }
};

export default RHFFormField;
