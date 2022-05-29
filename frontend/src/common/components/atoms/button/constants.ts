type SizeKey = 'xs' | 'sm' | 'normal';

type RoundedKey = 'sm' | 'normal' | 'full';

type VariantKey = 'primary' | 'secondary' | 'white';
type VariantValue = {
    normal: string;
    outline: string;
};

export type ButtonClasses = {
    base: string;
    size: Record<SizeKey, string>;
    rounded: Record<RoundedKey, string>;
    variant: Record<VariantKey, VariantValue>;
};

const buttonClasses: ButtonClasses = {
    base: 'font-bold cursor-pointer no-underline text-center m-0 uppercase outline-none transition ease-in-out',
    size: {
        xs: 'py-2 px-4 text-xs',
        sm: 'py-2 px-8 text-sm',
        normal: 'py-4 px-12',
    },
    rounded: {
        sm: 'rounded-sm',
        normal: 'rounded',
        full: 'rounded-full',
    },
    variant: {
        primary: {
            normal: 'bg-primary hover:bg-opacity-70 text-white',
            outline:
                'border-2 border-primary text-primary hover:text-white hover:bg-primary',
        },
        secondary: {
            normal: 'bg-secondary hover:bg-opacity-70 text-white',
            outline:
                'border-2 border-secondary text-secondary hover:text-white hover:bg-secondary',
        },
        white: {
            normal: 'bg-white hover:bg-opacity-70 text-primary',
            outline: 'border-2 border-white text-white hover:text-primary hover:bg-white',
        },
    },
};

export default buttonClasses;
