export const isNonNullable = <T>(x: T): x is NonNullable<T> => {
    return x !== null && typeof x !== 'undefined';
};

export const capitalize = ([first, ...rest]: string, lowerRest = false) =>
    first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

export const padNumber = (value: number): string => {
    if (value <= 10) {
        return `0${value}`;
    }

    return value.toString();
};
