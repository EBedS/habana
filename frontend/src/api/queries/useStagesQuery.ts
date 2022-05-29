import { UseQueryOptions, useQuery } from 'react-query';

import { API_URI, fetcher } from '@api/constants';
import { getJWTFromLocalStorage } from '@common/utils/localStorage';

export type UseStagesQueryDataItem = {
    id: number;
    title: string;
    description: string;
    available_from: string;
    available_until: string;
    sort_order: number;
};

type UseStagesQueryData = ReadonlyArray<UseStagesQueryDataItem>;

const useStagesQuery = (
    options?: UseQueryOptions<unknown, unknown, UseStagesQueryData>
) => {
    const result = useQuery<unknown, unknown, UseStagesQueryData>(
        'stages',
        () =>
            fetcher(`${API_URI}/habanaforms/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getJWTFromLocalStorage()?.access}`,
                },
            }),
        options
    );

    return result;
};

export default useStagesQuery;
