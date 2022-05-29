import clsx from 'clsx';

import styles from './spinner.module.scss';

export type SpinnerProps = {
    className?: string;
};

const classes = clsx(
    'ease-linear rounded-full w-5 h-5 block border-2 border-gray-200',
    styles.spinner
);

export const Spinner: React.FC<SpinnerProps> = ({ className }: SpinnerProps) => {
    return <span className={clsx(classes, className)} />;
};

export default Spinner;
