import { UseMutationOptions, useMutation } from 'react-query';

import { API_URI, fetcher } from '@api/constants';

type UseRegisterMutationVariables = {
    owner: string;
    habana_form_field: string;
    value: string;
};

type UseRegisterMutationData = {
    message: string;
};

const useAnswerStageFieldMutation = (
    options?: UseMutationOptions<
        UseRegisterMutationData,
        unknown,
        UseRegisterMutationVariables
    >
) => {
    const result = useMutation<
        UseRegisterMutationData,
        unknown,
        UseRegisterMutationVariables
    >(async (data) => {
        const formData = new FormData();

        for (const name in data) {
            formData.append(name, data[name as keyof typeof data]);
        }

        return fetcher(`${API_URI}/habanaformresponse/`, {
            method: 'POST',
            body: formData,
        });
    }, options);

    return result;
};

export default useAnswerStageFieldMutation;
