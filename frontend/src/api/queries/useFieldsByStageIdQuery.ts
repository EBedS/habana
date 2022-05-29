import { useQuery } from 'react-query';

import { API_URI, fetcher } from '@api/constants';
import { getJWTFromLocalStorage } from '@common/utils/localStorage';

export type StageByIdField = {
    id: number;
    title: string;
    description: string;
    field_type: 1 | 2 | 3 | 4;
    sort_order: number;
};

export type UseStageByIdQueryData = ReadonlyArray<StageByIdField>;

type UseStagesQueryData = UseStageByIdQueryData;

const useFieldsByStageIdQuery = (id: string | undefined) => {
    const result = useQuery<unknown, unknown, UseStagesQueryData>(
        `stage/${id}`,
        () =>
            fetcher(`${API_URI}/habanaforms/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getJWTFromLocalStorage()?.access}`,
                },
            }),
        {
            enabled: !!id,
        }
    );

    return result;
};

export default useFieldsByStageIdQuery;
