import { UseMutationOptions, useMutation } from 'react-query';

import { API_URI, fetcher } from '@api/constants';

type UseRegisterMutationVariables = {
    first_name: string;
    last_name: string;
    birthdate: string;
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

const useRegisterMutation = (
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

        return fetcher(`${API_URI}/users/`, {
            method: 'POST',
            body: formData,
        });
    }, options);

    return result;
};

export default useRegisterMutation;
