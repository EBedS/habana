import { execOnlyOnClient } from './ssr';

const KEY = 'JWT';

type JWT = {
    user: {
        id: string;
        email: string;
        first_name: string;
    };
    access: string;
    refresh: string;
};

export const saveJWTOnLocalStorage = (jwt: JWT) =>
    execOnlyOnClient(() => {
        window.localStorage.setItem(KEY, JSON.stringify(jwt));
    })();

export const removeJWTFromLocalStorage = execOnlyOnClient(() => {
    window.localStorage.removeItem(KEY);
});

export const getJWTFromLocalStorage = execOnlyOnClient((): JWT | null => {
    let token: JWT | null = null;
    try {
        const local = localStorage.getItem(KEY);

        if (local) {
            const parsed = JSON.parse(local) as JWT;
            token = parsed;
        }
    } catch (err) {
        console.error('Not a JSON');
    }

    return token;
});
