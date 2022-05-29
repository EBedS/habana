export const API_HOST =
    process.env.NODE_ENV === 'production'
        ? 'https://'
        : // : 'http://127.0.0.1:8000';
          'https://habanafintual.herokuapp.com';

export const API_URI = `${API_HOST}`;

export const fetcher = (...rest: Parameters<typeof fetch>) =>
    fetch(...rest)
        .then(async (response) => {
            return await response.json();
        })
        .then((json) => {
            if (json.detail) {
                throw new Error(json.code);
            }

            return json;
        });
