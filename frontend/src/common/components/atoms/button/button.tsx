import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

import buttonClasses, { ButtonClasses } from './constants';

export type ButtonProps = {
    type?: 'submit';
    tag?: 'button' | 'a' | 'input' | 'label';
    block?: boolean;
    outline?: boolean;
    duration?: string;
    className?: string;
    size?: keyof ButtonClasses['size'];
    rounded?: keyof ButtonClasses['rounded'];
    variant?: keyof ButtonClasses['variant'];
    children?: React.ReactNode;
    target?: string;
    rel?: string;
    href?: string;
    onClick?: () => void;
    htmlFor?: string;
};

export const Button = forwardRef<any, ButtonProps>(
    (
        {
            tag: Tag = 'button',
            size = 'normal',
            rounded = 'full',
            variant = 'primary',
            outline = false,
            block,
            duration,
            className,
            children,
            target,
            rel,
            href,
            onClick,
            htmlFor,
        },
        ref
    ) => {
        return (
            <Tag
                className={clsx(
                    buttonClasses.base,
                    buttonClasses.size[size],
                    buttonClasses.rounded[rounded],
                    buttonClasses.variant[variant][outline ? 'outline' : 'normal'],
                    block && 'block',
                    duration || 'duration-150',
                    className
                )}
                ref={ref}
                target={target}
                rel={rel}
                href={href}
                onClick={onClick}
                htmlFor={htmlFor}
            >
                {children}
            </Tag>
        );
    }
);

Button.displayName = 'Button';

type ButtonLinkProps = ButtonProps & {
    href: string;
    blank?: boolean;
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({
    tag,
    blank,
    children,
    ...rest
}) => {
    const finalTag = tag || blank ? 'a' : 'button';

    if (blank) {
        return (
            <Button {...rest} tag={finalTag} target="_blank" rel="noopener">
                {children}
            </Button>
        );
    }

    return (
        <Link href={rest.href} passHref>
            <Button {...rest} tag={finalTag}>
                {children}
            </Button>
        </Link>
    );
};

export default Button;
