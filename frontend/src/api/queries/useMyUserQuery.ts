import { UseQueryOptions, useQuery } from 'react-query';

import { API_URI, fetcher } from '@api/constants';
import { getJWTFromLocalStorage } from '@common/utils/localStorage';

type UseStagesQueryData = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
};

const useMyUserQuery = (
    options?: UseQueryOptions<unknown, unknown, UseStagesQueryData>
) => {
    const result = useQuery<unknown, unknown, UseStagesQueryData>(
        'myuser',
        () =>
            fetcher(`${API_URI}/api/current_user/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getJWTFromLocalStorage()?.access}`,
                },
            }),
        options
    );

    return result;
};

export default useMyUserQuery;
