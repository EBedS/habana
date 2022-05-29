const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        cursor: {
            ...defaultTheme.cursor,
            grab: 'grab',
        },
        extend: {
            colors: {
                primary: '#005AD6',
                'primary-light': '#975df4',
                'primary-variant': '#975df4',
                'primary-dark-variant': '#31398b',
                secondary: '#e62ef4',
                tertiary: '#00E5C8',
                'body-main': '#4957e1',
            },
            fontSize: {
                '4.2xl': '2.5rem',
                '4.3xl': '2.75rem',
            },
            fontFamily: {
                sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'serif'],
                headings: ['"Metropolis"', 'sans-serif'],
            },
            screens: {
                xxl: '1400px',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '7%',
            },
        },
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: { fontFamily: theme('fontFamily.headings') },
                h2: { fontFamily: theme('fontFamily.headings') },
                h3: { fontFamily: theme('fontFamily.headings') },
                h4: { fontFamily: theme('fontFamily.headings') },
                h5: { fontFamily: theme('fontFamily.headings') },
                h6: { fontFamily: theme('fontFamily.headings') },
            });
        }),
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '100%',
                    '@screen sm': {
                        maxWidth: '100%',
                    },
                    '@screen md': {
                        maxWidth: '100%',
                    },
                    '@screen lg': {
                        maxWidth: '100%',
                    },
                    '@screen xl': {
                        maxWidth: '1300px',
                    },
                },
            });
        },
    ],
    variants: {
        extend: {
            grayscale: ['hover', 'focus'],
        },
    },
};
