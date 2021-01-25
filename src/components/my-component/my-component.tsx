import { Component, /* Listen, */ /* ComponentInterface, */ Element, Event, EventEmitter, Host, Prop, /* State, */ Watch, h } from '@stencil/core';
import { RangeChangeEventDetail/* , RangeValue */ } from './my-component-interface';
import { clamp, convertRange } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() private el: HTMLElement;
  private dragItem;
  // private base: HTMLElement;
  private active = false;
  private currentX;
  private currentY: number;
  private initialX;
  private initialY;
  private xOffset = 0;
  private yOffset = 0;
  private touchStartY = 0;
  private _debounce = false;
  // private touchStartMs = 0;
  

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop() color?: string;

  /**
   * How long, in milliseconds, to wait to trigger the
   * `ionChange` event after each change in the range value.
   * This also impacts form bindings such as `ngModel` or `v-model`.
   */
  @Prop() debounce = 10;

  @Watch('debounce')
  protected debounceChanged() {
    // this.ionChange = debounceEvesnt(this.ionChange, this.debounce);
  }
  /**
   * Minimum integer value of the range.
   */
  @Prop() min = 0;
  @Watch('min')
  protected minChanged() {
    console.log("Min changed");
  }

  /**
   * Maximum integer value of the range.
   */
  @Prop() max = 100;
  @Watch('max')
  protected maxChanged() {
    console.log("Max changed");
  }
  
  
  
    /**
   * Emitted when the value property has changed.
   */
  @Event() junChange!: EventEmitter<RangeChangeEventDetail>;

  /**
   * Value
   */
  // @Prop({ mutable: true }) value = 50;
  @Prop() value = 0;
  @Watch('value')
  protected valueChanged(value: number) {

    // if (value < 0 || value > this.el.clientHeight) 
    //   return;
    const scaledVal = this.valueToPixels( value );
    this.setTranslate(0, scaledVal, this.dragItem);

    console.log("Value: ", value);
    if (!this._debounce) {
      // value = Math.trunc(value);
      this.junChange.emit({ value });
      this._debounce = true;
      setTimeout(() => {
        this._debounce = false;
      }, this.debounce);  
    }
  }



  protected valueToPixels(value: number): number {
    return convertRange( value, [ this.max, this.min ], [ 0, this.el.clientHeight ] );
  }

  protected pixelsToValue(pixels: number): number {
    return convertRange( pixels, [ this.el.clientHeight, 0 ], [ this.min, this.max ] );
  }

  protected initValue(val: number) {
    this.valueChanged( val );
    this.currentY =this.valueToPixels( val );
    this.yOffset = this.currentY;
    console.log(`Min: ${this.min} Max: ${this.max}`);
  }


  componentWillLoad() {

  } 

  componentDidLoad() {
    // console.log("Will load: ", this.base.clientWidth);
    // console.log("Will load: ", this.base.clientHeight);

    // this.dragItem = document.querySelector("#item");
    // this.el.addEventListener("click", (e) => this.click(e), false);
    this.initValue(this.value);

    this.el.addEventListener("touchstart", (e) => this.dragStart(e), false);
    this.el.addEventListener("touchend", (e) => this.dragEnd(e), false);
    this.el.addEventListener("touchmove", (e) => this.drag(e), false);

    this.el.addEventListener("mousedown", (e) => this.dragStart(e), false);
    this.el.addEventListener("mouseup", (e) => this.dragEnd(e), false);
    this.el.addEventListener("mousemove", (e) => this.drag(e), false);

  }

  // private click(e) {
  //   console.log("Click: ", e.offsetY);
  //   // this.setTranslate(0, e.offsetY, this.dragItem);
  // }

  private dragStart(e) {
    let touchX
    let touchY;

    if (e.type === "touchstart") {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY  
    } else {
      touchX = e.clientX;
      touchY = e.clientY;
    }

    this.initialX = touchX - this.xOffset;
    this.initialY = touchY - this.yOffset;
    this.touchStartY = touchY;

    if (e.target === this.el || e.target === this.dragItem) {
      this.active = true;
    }
  }

  private dragEnd(e) {
    // console.log("drag end");
    // if (e.type === "touchend") {
    //   this.currentY = e.touches[0].clientY - this.initialY;
    // } else 
    if (e.type === "mouseup") {
      if ( Math.abs(e.clientY - this.touchStartY) < 2 ) {
        // console.log(`A: ${e.clientY} B: ${e.offsetY} C: ${e.pageY} D: ${e.screenY}`);
        // this.setTranslate(0, e.clientY - e.offsetY, this.dragItem);
        this.currentY = e.offsetY;
        this.yOffset = this.currentY;  

        if ( this.currentY ) {
          // this.value = 88;
          this.valueChanged( this.pixelsToValue(this.currentY) );
        }  
      }

      this.initialX = this.currentX;
      this.initialY = this.currentY;

    }

    // const ratio = this.valueToRatio(this.currentY, this.min, this.max);
    this.active = false;
  }

  private drag(e) {
    // console.log("drag");

    if (this.active) {
    
      e.preventDefault();
      let touchX
      let touchY;
      
      if (e.type === "touchmove") {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
      } else {
        touchX = e.clientX;
        touchY = e.clientY;
      }

      this.currentX = touchX - this.initialX;
      this.currentY = touchY - this.initialY;
      
      if ( this.currentY < 0 ) {
        this.currentY = 0;
        this.initialY = touchY;
      } else if ( this.currentY > this.el.scrollHeight ) {
        this.currentY = this.el.scrollHeight;
        this.initialY = touchY - this.yOffset;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      // this.setTranslate(this.currentX, this.currentY, this.el);
      // this.setTranslate(0, this.currentY, this.dragItem);
      // this.value = 25
      this.valueChanged( this.pixelsToValue(this.currentY) );
    }
  }

  setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  render() {
    return (
      <Host>
        <div id="back"
          // ref={base => this.base = base as HTMLElement}
        >
          <div id="slide"
            ref={slide => this.dragItem = slide as HTMLElement}
            // style={{backgroundColor:"var(--slide-bar-color)"}}
          >
          </div>
        </div>
      </Host>
    );
  }


  valueToRatio(value: number, min: number, max: number): number {
    return clamp(0, (value - min) / (max - min), 1);
  };
}
