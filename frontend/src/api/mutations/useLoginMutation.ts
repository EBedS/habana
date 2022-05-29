import { UseMutationOptions, useMutation } from 'react-query';

import { API_URI, fetcher } from '@api/constants';

type UseRegisterMutationVariables = {
    email: string;
    password: string;
};

type UseRegisterMutationData = {
    user: {
        id: string;
        email: string;
        first_name: string;
    };
    access: string;
    refresh: string;
};

const useLoginMutation = (
    options: UseMutationOptions<
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

        return fetcher(`${API_URI}/api/token/`, {
            method: 'POST',
            body: formData,
        });
    }, options);

    return result;
};

export default useLoginMutation;
