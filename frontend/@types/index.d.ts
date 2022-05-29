declare module 'country-codes-list' {
    function customList(a: string, b: string): Record<string, string>;
}

type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Make readonly object writable */
type Writable<T> = { -readonly [P in keyof T]: T[P] };

/** Like Writable but recursive */
type DeepWritable<T> = T extends Record<string, any>
    ? { -readonly [K in keyof T]: DeepWritable<T[K]> }
    : T;
