import { createContext, useContext } from 'react';

export type SiteConfig = {
    seo: {
        description: string;
        organization: string;
        separator: string;
        images?: {
            facebook: string;
            twitter: string;
        };
    } & (
        | {
              title: string;
              fullTitle?: never;
          }
        | {
              title?: never;
              fullTitle: string;
          }
    );
};

type SiteConfigContextData = SiteConfig;

const SiteConfigContext = createContext<SiteConfigContextData | undefined>(undefined);

export type SiteConfigProviderProps = SiteConfig;

export const SiteConfigProvider: React.FC<SiteConfigProviderProps> = ({
    children,
    ...config
}) => <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>;

export const useSiteConfig = () => {
    const context = useContext(SiteConfigContext);

    if (context === undefined) {
        throw new Error('useSiteConfig should be used inside SiteConfigProvider');
    }

    return context;
};
