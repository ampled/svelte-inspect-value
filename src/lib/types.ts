import type { VType } from "./util.js";

export type TypeViewProps<T> = {
    key?: string | number | symbol;
    value?: T;
    type?: VType;
}