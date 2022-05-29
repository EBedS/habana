import clsx from 'clsx';

import Spinner from '../../atoms/spinner/spinner';

type ViewLoadingProps = {
    fullPage?: boolean;
};

export const ViewLoading: React.FC<ViewLoadingProps> = ({ fullPage }) => (
    <div
        className={clsx(
            'relative flex items-center justify-center w-full h-full p-12',
            fullPage && 'min-h-screen'
        )}
    >
        <Spinner />
    </div>
);

export default ViewLoading;
