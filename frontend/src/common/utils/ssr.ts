export const windowExists = () => typeof window !== 'undefined';

export const execOnlyOnClient =
    <R>(myFunction: (...args: never[]) => R) =>
    (): R | null => {
        if (windowExists()) {
            return myFunction();
        }

        return null;
    };
