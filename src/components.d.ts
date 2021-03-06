/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RangeChangeEventDetail } from "./components/vertical-slider/vertical-slider-interface";
export namespace Components {
    interface MySecondComponent {
        "first": string;
        "last": string;
        "middle": string;
        "value": number;
    }
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
}
declare global {
    interface HTMLMySecondComponentElement extends Components.MySecondComponent, HTMLStencilElement {
    }
    var HTMLMySecondComponentElement: {
        prototype: HTMLMySecondComponentElement;
        new (): HTMLMySecondComponentElement;
    };
    interface HTMLVerticalSliderElement extends Components.VerticalSlider, HTMLStencilElement {
    }
    var HTMLVerticalSliderElement: {
        prototype: HTMLVerticalSliderElement;
        new (): HTMLVerticalSliderElement;
    };
    interface HTMLElementTagNameMap {
        "my-second-component": HTMLMySecondComponentElement;
        "vertical-slider": HTMLVerticalSliderElement;
    }
}
declare namespace LocalJSX {
    interface MySecondComponent {
        "first"?: string;
        "last"?: string;
        "middle"?: string;
        "value"?: number;
    }
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
        "onJunChange"?: (event: CustomEvent<RangeChangeEventDetail>) => void;
        /**
          * Value
         */
        "value"?: number;
    }
    interface IntrinsicElements {
        "my-second-component": MySecondComponent;
        "vertical-slider": VerticalSlider;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-second-component": LocalJSX.MySecondComponent & JSXBase.HTMLAttributes<HTMLMySecondComponentElement>;
            "vertical-slider": LocalJSX.VerticalSlider & JSXBase.HTMLAttributes<HTMLVerticalSliderElement>;
        }
    }
}
