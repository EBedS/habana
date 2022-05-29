import { FieldValues, SubmitErrorHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FormByUuidQuery } from '@api/graphql';
import {
    FormField,
    FormFieldRepeatableMeta,
    FormFieldVisibilityCondition,
    Maybe,
} from '@api/graphql';

type VisibilityCondition = Pick<FormFieldVisibilityCondition, 'evaluationOrder'> & {
    readonly option: Maybe<Pick<FormFieldRepeatableMeta, 'id'>>;
    readonly dependsOn: Pick<FormField, 'id'>;
};

export const fieldMeetsConditions = (
    visibilityConditions: ReadonlyArray<VisibilityCondition>,
    formValues: FieldValues
) => {
    let meetsConditions = true;

    const sortedConditions = [...visibilityConditions].sort(
        (a, b) => a.evaluationOrder - b.evaluationOrder
    );

    for (let index = 0; index < sortedConditions.length; index++) {
        const condition = sortedConditions[index];

        const { option, dependsOn } = condition;

        const dependencyValue = formValues[dependsOn.id];

        if (dependencyValue !== option?.id) {
            meetsConditions = false;
        }

        if (!meetsConditions) {
            break;
        }
    }

    return meetsConditions;
};

export const getFieldContainerId = (id: FormField['id']) => `field-${id}-container`;

export const manageFormError =
    (form: NonNullable<FormByUuidQuery['formByUuid']>): SubmitErrorHandler<FieldValues> =>
    (errors) => {
        const fieldsWithErrors = Object.keys(errors) as Array<keyof typeof errors>;
        const firstErroredId = fieldsWithErrors[0];
        const firstError = errors[fieldsWithErrors[0]];

        const firstErroredField = form.sections[0].fields.find((someField) => {
            return someField.id === firstErroredId;
        });

        const fieldTitle = firstErroredField?.title;

        const element = document.getElementById(getFieldContainerId(firstErroredId));
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth',
            });
        }

        if (firstError.type === 'pattern') {
            if (fieldTitle) {
                toast.error(`El campo "${fieldTitle}" es inválido`);
            } else {
                toast.error(`Un campo del formulario contiene un valor no válido`);
            }
        } else if (firstError.type === 'required') {
            if (fieldTitle) {
                toast.error(`El campo: "${firstErroredField?.title}" es requerido`);
            } else {
                toast.error(`Por favor, completa todos lo campos requeridos`);
            }
        } else {
            if (fieldTitle) {
                toast.error(`Hay un error en el campo: "${firstErroredField?.title}"`);
            } else {
                toast.error(`Un campo del formulario es erróneo`);
            }
        }
    };
