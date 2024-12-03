import ArrayView from "./ArrayView.svelte";
import BigIntView from "./BigIntView.svelte";
import BooleanView from "./BooleanView.svelte";
import ClassView from "./ClassView.svelte";
import DateView from "./DateView.svelte";
import ErrorView from "./ErrorView.svelte";
import FunctionView from "./FunctionView.svelte";
import HtmlImageElementView from "./HTMLImageElementView.svelte";
import HtmlView from "./HTMLView.svelte";
import MapView from "./MapView.svelte";
import NullView from "./NullView.svelte";
import NumberView from "./NumberView.svelte";
import ObjectView from "./ObjectView.svelte";
import OneLineView from "./OneLineView.svelte";
import RegexView from "./RegexView.svelte";
import SetView from "./SetView.svelte";
import StringView from "./StringView.svelte";
import SymbolView from "./SymbolView.svelte";
import UndefinedView from "./UndefinedView.svelte";
import UrlSearchParamsView from "./URLSearchParamsView.svelte";
import UrlView from "./URLView.svelte";

export default {
    object: ObjectView,
    array: ArrayView,
    string: StringView,
    number: NumberView,
    boolean: OneLineView,
    function: FunctionView,
    class: ClassView,
    symbol: SymbolView,
    undefined: OneLineView,
    null: OneLineView,
    regexp: RegexView,
    date: DateView,
    bigint: OneLineView,
    error: ErrorView,
    map: MapView,
    set: SetView,
    url: UrlView,
    urlsearchparams: UrlSearchParamsView,
    htmlimageelement: HtmlImageElementView,
    html: HtmlView
} as const;