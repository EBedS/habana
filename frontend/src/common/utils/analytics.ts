type Props = Record<string, string | number | boolean | (() => void) | undefined>;

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ANALYITICS_ID;

const sendEvent = (name: string) => (props: Props) => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('event', name, props);
};

type PageViewProps = {
    url: string;
};

export const trackPageView = ({ url }: PageViewProps): void => {
    if (typeof window === 'undefined' || !window.gtag || !GA_TRACKING_ID) return;

    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

type ScreenViewProps = {
    screen_name: string;
};

export const trackScreenView = (props: ScreenViewProps): void =>
    sendEvent('screen_view')(props);

type ExceptionProps = {
    description: string;
    fatal?: boolean;
};

export const trackException = (props: ExceptionProps): void =>
    sendEvent('exception')({ fatal: false, ...props });

type OutboundProps = {
    url: string;
};

export const trackOutboundLink = ({ url }: OutboundProps): void =>
    sendEvent('click')({
        event_category: 'outbound',
        event_label: url,
        transport_type: 'beacon',
        event_callback() {
            document.location = url as unknown as Location;
        },
    });

type AuthProps = {
    method: string;
};

export const trackLogin = (props: AuthProps): void => sendEvent('login')(props);

export const trackSignUp = (props: AuthProps): void => sendEvent('sign_up')(props);

type SearchProps = {
    search_term: string;
};

export const trackSearch = (props: SearchProps): void => sendEvent('search')(props);

type ShareProps = {
    content_type: string;
    item_id?: string;
    method: string;
};

export const trackShare = (props: ShareProps): void => sendEvent('share')(props);
