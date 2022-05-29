import { useQuery } from 'react-query';

import { API_URI, fetcher } from '@api/constants';
import { getJWTFromLocalStorage } from '@common/utils/localStorage';

type UseStagesAnswersStatusQueryData = Record<string, boolean>;

const useStagesAnswersStatusQuery = () => {
    const result = useQuery<unknown, unknown, UseStagesAnswersStatusQueryData>(
        `stages_status`,
        () =>
            fetcher(`${API_URI}/api/stages_status`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getJWTFromLocalStorage()?.access}`,
                },
            })
    );

    return result;
};

export default useStagesAnswersStatusQuery;
