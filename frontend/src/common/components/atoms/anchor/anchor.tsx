import Link from 'next/link';
import { forwardRef } from 'react';

export type AnchorProps = {
    href: string;
    blank?: boolean;
    className?: string;
    children?: React.ReactNode;
};

export const BaseAnchor = forwardRef<HTMLAnchorElement, AnchorProps>(
    ({ children, blank, ...rest }, ref) => {
        const props = {
            ...rest,
            ref,
            target: undefined as string | undefined,
            rel: undefined as string | undefined,
        };

        if (blank) {
            props.target = 'blank';
            props.rel = 'noopener';
        }

        return <a {...props}>{children}</a>;
    }
);

export const Anchor: React.FC<AnchorProps> = ({ children, ...rest }) => {
    if (rest.blank) {
        return <BaseAnchor {...rest}>{children}</BaseAnchor>;
    }

    return (
        <Link href={rest.href} passHref>
            <BaseAnchor {...rest}>{children}</BaseAnchor>
        </Link>
    );
};
