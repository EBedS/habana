const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: isProd ? '' : '',
    env: {
        NEXT_PUBLIC_ORIGIN: isProd ? 'https://' : 'http://localhost:3000',
    },
    i18n: {
        locales: ['es'],
        defaultLocale: 'es',
    },
    env: {
        NEXT_PUBLIC_ORIGIN: isProd ? 'https://' : 'http://localhost:3000',
    },
};

module.exports = nextConfig;
