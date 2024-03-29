/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RangeChangeEventDetail } from "./components/vertical-slider/vertical-slider-interface";
import { RangeChangeEventDetail as RangeChangeEventDetail1 } from "./components/vertical-switch/vertical-switch-interface";
export { RangeChangeEventDetail } from "./components/vertical-slider/vertical-slider-interface";
export { RangeChangeEventDetail as RangeChangeEventDetail1 } from "./components/vertical-switch/vertical-switch-interface";
export namespace Components {
    interface VerticalSlider {
        /**
          * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
         */
        "color"?: string;
        /**
          * How long, in milliseconds, to wait to trigger the `ionChange` event after each change in the range value. This also impacts form bindings such as `ngModel` or `v-model`.
         */
        "debounce": number;
        "icon": string;
        /**
          * Maximum integer value of the range.
         */
        "max": number;
        /**
          * Minimum integer value of the range.
         */
        "min": number;
        /**
          * Value
         */
        "value": number;
    }
    interface VerticalSwitch {
        /**
          * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
         */
        "color"?: string;
        /**
          * How long, in milliseconds, to wait to trigger the `ionChange` event after each change in the range value. This also impacts form bindings such as `ngModel` or `v-model`.
         */
        "debounce": number;
        "icon": string;
        /**
          * Maximum integer value of the range.
         */
        "max": number;
        /**
          * Minimum integer value of the range.
         */
        "min": number;
        /**
          * Value
         */
        "value": number;
    }
}
export interface VerticalSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVerticalSliderElement;
}
export interface VerticalSwitchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLVerticalSwitchElement;
}
declare global {
    interface HTMLVerticalSliderElement extends Components.VerticalSlider, HTMLStencilElement {
    }
    var HTMLVerticalSliderElement: {
        prototype: HTMLVerticalSliderElement;
        new (): HTMLVerticalSliderElement;
    };
    interface HTMLVerticalSwitchElement extends Components.VerticalSwitch, HTMLStencilElement {
    }
    var HTMLVerticalSwitchElement: {
        prototype: HTMLVerticalSwitchElement;
        new (): HTMLVerticalSwitchElement;
    };
    interface HTMLElementTagNameMap {
        "vertical-slider": HTMLVerticalSliderElement;
        "vertical-switch": HTMLVerticalSwitchElement;
    }
}
declare namespace LocalJSX {
    interface VerticalSlider {
        /**
          * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
         */
        "color"?: string;
        /**
          * How long, in milliseconds, to wait to trigger the `ionChange` event after each change in the range value. This also impacts form bindings such as `ngModel` or `v-model`.
         */
        "debounce"?: number;
        "icon"?: string;
        /**
          * Maximum integer value of the range.
         */
        "max"?: number;
        /**
          * Minimum integer value of the range.
         */
        "min"?: number;
        /**
          * Emitted when the value property has changed.
         */
        "onJunChange"?: (event: VerticalSliderCustomEvent<RangeChangeEventDetail>) => void;
        /**
          * Value
         */
        "value"?: number;
    }
    interface VerticalSwitch {
        /**
          * The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`. For more information on colors, see [theming](/docs/theming/basics).
         */
        "color"?: string;
        /**
          * How long, in milliseconds, to wait to trigger the `ionChange` event after each change in the range value. This also impacts form bindings such as `ngModel` or `v-model`.
         */
        "debounce"?: number;
        "icon"?: string;
        /**
          * Maximum integer value of the range.
         */
        "max"?: number;
        /**
          * Minimum integer value of the range.
         */
        "min"?: number;
        /**
          * Emitted when the value property has changed.
         */
        "onJunChange"?: (event: VerticalSwitchCustomEvent<RangeChangeEventDetail1>) => void;
        /**
          * Value
         */
        "value"?: number;
    }
    interface IntrinsicElements {
        "vertical-slider": VerticalSlider;
        "vertical-switch": VerticalSwitch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "vertical-slider": LocalJSX.VerticalSlider & JSXBase.HTMLAttributes<HTMLVerticalSliderElement>;
            "vertical-switch": LocalJSX.VerticalSwitch & JSXBase.HTMLAttributes<HTMLVerticalSwitchElement>;
        }
    }
}
