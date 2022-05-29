import clsx from 'clsx';

import Button, { ButtonProps } from '../../atoms/button/button';
import Spinner from '../../atoms/spinner/spinner';

export type LoadableButtonProps = ButtonProps & {
    loading: boolean;
};

export const LoadableButton: React.FC<LoadableButtonProps> = ({
    children,
    loading,
    ...rest
}) => (
    <Button {...rest}>
        <div className="relative">
            <div className={clsx(loading && 'opacity-0')}>{children}</div>

            {loading && (
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <Spinner />
                </div>
            )}
        </div>
    </Button>
);

export default LoadableButton;
