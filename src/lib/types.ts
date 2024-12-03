import type { VType } from "./util.js";

export type KeyName = string | number | symbol;

export type TypeViewProps<T> = {
    key?: KeyName;
    path?: KeyName[];
    value?: T;
    type?: VType;
}