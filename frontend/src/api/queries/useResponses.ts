import { useQuery } from 'react-query';

import { API_URI, fetcher } from '@api/constants';
import { getJWTFromLocalStorage } from '@common/utils/localStorage';

export type UseResponsesQueryDataItem = {
    id: number;
    owner: number;
    habana_form_field: number;
};

export type UseResponsesQueryData = ReadonlyArray<UseResponsesQueryDataItem>;

const useResponsesQuery = () => {
    const result = useQuery<unknown, unknown, UseResponsesQueryData>('responses', () =>
        fetcher(`${API_URI}/habanaformresponse`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getJWTFromLocalStorage()?.access}`,
            },
        })
    );

    return result;
};

export default useResponsesQuery;
