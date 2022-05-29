import '../../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import Seo from '@common/components/atoms/seo/seo';
import ViewLoading from '@common/components/molecules/view-loading/view-loading';
import { SiteConfigProvider } from '@common/context/SiteConfigContext';
import { trackPageView } from '@common/utils/analytics';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 0,
        },
    },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;

        const handleRouteChange = (url: string): void => {
            trackPageView({ url });
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsLoading(true));
        router.events.on('routeChangeComplete', () => setIsLoading(false));
    }, [router, setIsLoading]);

    return (
        <QueryClientProvider client={queryClient}>
            <SiteConfigProvider
                seo={{
                    fullTitle: 'FIN - Fintual Intensivo Natales',
                    description: '',
                    organization: 'Fintual',
                    separator: '|',
                }}
            >
                {isLoading ? (
                    <>
                        <Seo />
                        <ViewLoading />
                    </>
                ) : (
                    <Component {...pageProps} />
                )}
            </SiteConfigProvider>

            <ToastContainer />
        </QueryClientProvider>
    );
};

export default MyApp;
