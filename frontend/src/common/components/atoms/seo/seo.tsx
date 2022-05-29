import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSiteConfig } from '@common/context/SiteConfigContext';

export type SeoProps = (
    | { title: string; fullTitle?: never }
    | { title?: never; fullTitle: string }
    | { title?: never; fullTitle?: never }
) & {
    description?: string | null;
    indexable?: boolean;
    images?: {
        facebook: string;
        twitter: string;
    };
};

export const Seo: React.FC<SeoProps> = ({
    title,
    fullTitle,
    description,
    images,
    indexable,
}) => {
    const router = useRouter();
    const { seo } = useSiteConfig();

    const url = `${process.env.NEXT_PUBLIC_HOST || ''}${router.asPath}`;

    let finalTitle = seo.fullTitle || `${seo.title} ${seo.separator} ${seo.organization}`;
    if (fullTitle) {
        fullTitle = title;
    } else if (title) {
        finalTitle = `${title} ${seo.separator} ${seo.organization}`;
    }

    let finalDescription = seo.description;
    if (description) {
        finalDescription = description;
    }

    let finalImages = seo.images;
    if (images) {
        finalImages = images;
    }

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="title" content={finalTitle} />
            {finalDescription && <meta name="description" content={finalDescription} />}

            {!indexable && <meta name="robots" content="noindex, nofollow" />}

            {url && <meta property="og:url" content={url} />}
            {finalTitle && <meta property="og:title" content={finalTitle} />}
            {finalDescription && (
                <meta property="og:description" content={finalDescription} />
            )}

            {finalImages && (
                <meta
                    name="image"
                    content={`${process.env.NEXT_PUBLIC_HOST}/${finalImages.facebook}`}
                />
            )}

            {/* facebook | linkedin */}
            {finalImages && (
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_HOST}/${finalImages.facebook}`}
                />
            )}

            {/* twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            {finalTitle && <meta name="twitter:title" content={finalTitle} />}
            {finalDescription && (
                <meta name="twitter:description" content={finalDescription} />
            )}

            {finalImages && (
                <meta
                    name="twitter:image"
                    content={`${process.env.NEXT_PUBLIC_HOST}/${finalImages.twitter}`}
                />
            )}
        </Head>
    );
};

export default Seo;
