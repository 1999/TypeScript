// @strictNullChecks: true
// @declaration: true

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends string | number, T> = {
    [_ in K]: T;
}

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

declare function assign<T>(obj: T, props: Partial<T>): void;
declare function freeze<T>(obj: T): Readonly<T>;
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;
declare function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>;
declare function proxify<T>(obj: T): Proxify<T>;

interface Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

interface PartialShape {
    name?: string;
    width?: number;
    height?: number;
    visible?: boolean;
}

interface ReadonlyShape {
    readonly name: string;
    readonly width: number;
    readonly height: number;
    readonly visible: boolean;
}

function f0(s1: Shape, s2: Shape) {
    assign(s1, { name: "circle" });
    assign(s2, { width: 10, height: 20 });
}

function f1(shape: Shape) {
    var frozen: ReadonlyShape;
    var frozen: Readonly<Shape>;
    var frozen = freeze(shape);
}

function f2(shape: Shape) {
    var partial: PartialShape;
    var partial: Partial<Shape>;
    var partial: Partial<Shape> = {};
}

function f3(shape: Shape) {
    const x = pick(shape, "name", "visible");  // { name: string, visible: boolean }
}

function f4() {
    const rec = { foo: "hello", bar: "world", baz: "bye" };
    const lengths = mapObject(rec, s => s.length);  // { foo: number, bar: number, baz: number }
}

function f5(shape: Shape) {
    const p = proxify(shape);
    let name = p.name.get();
    p.visible.set(false);
}

function f6(shape: DeepReadonly<Shape>) {
    let name = shape.name;  // DeepReadonly<string>
    let length = name.length;  // DeepReadonly<number>
    let toString = length.toString;  // DeepReadonly<(radix?: number) => string>
}