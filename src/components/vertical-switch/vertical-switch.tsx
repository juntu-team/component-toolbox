import { Component, /* Listen, */ /* ComponentInterface, */ Element, Event, EventEmitter, Host, Prop, /* State, */ Watch, h } from '@stencil/core';
import { RangeChangeEventDetail/* , RangeValue */ } from './vertical-switch-interface';
import { clamp, convertRange } from '../../utils/utils';
import 'ionicons';

@Component({
  tag: 'vertical-switch',
  styleUrl: 'vertical-switch.css',
  shadow: true
})
export class VerticalSlider {
  @Element() el: HTMLElement;


  // private background;
  private dragItem;
  private active = false;
  private currentX;
  private currentY: number;
  private initialX;
  private initialY;
  private xOffset = 0;
  private yOffset = 0;
  private _debounce = false;
  // private touchStartMs = 0;
  // private slider;
  private debug: string;
  // private count: number = 0;
  protected touchStartY = 0;
  

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop() color?: string;
  @Prop() icon = "heart";

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
  @Prop({ mutable: true }) value = 50;
  @Watch('value')
  valueChanged(value: number) {
    if (value < this.min ) { 
      value = this.value = this.min; 
      return;
    } else if (value > this.max ) { 
      value = this.value = this.max; 
      return;
    }

    // const ratio = this.getRatio( value );
    let ratio = this.valueToPixels(value);
    // if (ratio > this.dragItem.offsetHeight ) {
    //   ratio = this.dragItem.offsetHeight;
    // }
    this.setTranslate(0, ratio, this.dragItem);
    console.log(`Value: ${value} | ${ratio}`);

    if (!this._debounce) {
      // value = Math.trunc(value);
      this.junChange.emit({ value });
      this._debounce = true;
      setTimeout(() => {
        this._debounce = false;
      }, this.debounce);  
    }
  }


  protected getRatio(value: number): number {
    return convertRange( value, [ this.max, this.min ], [ 0, 1 ] );
  }

  protected valueToPixels(value: number): number {
    return convertRange( value, [ this.max, this.min ], [ 0, this.el.clientHeight ] );
  }

  protected pixelsToValue(pixels: number): number {
    return convertRange( pixels, [ this.el.clientHeight, 0 ], [ this.min, this.max ] );
  }

  protected initValue(value: number) {
    // if (value < this.min ) { 
    //   value = this.value = this.min; 
    //   return;
    // } else if (value > this.max ) { 
    //   value = this.value = this.max; 
    //   return;
    // }

    // const scaledVal = (this.max - this.min) - (value / (this.max - this.min) * 100);
    // this.dragItem.style.transform = "translate3d(" + 0 + "px, " + scaledVal + "%, 0)";
    // console.log(`Init value: ${this.min} | ${this.max} | ${value} | ${scaledVal}`);
    this.valueChanged( value );
    this.currentY =this.valueToPixels( value );
    this.yOffset = this.currentY;
  }

  // connectedCallback() {
  //   console.log("connectedCallback");
  // }

  // async componentWillLoad() {
  //   console.log("componentWillLoad");
  // }

  async componentDidLoad() {
    // this.slider = this.el.querySelector('.slide');
    this.dragItem.style.height = '50%';

    this.initValue( this.value );

    this.el.addEventListener("touchstart", (e) => this.dragStart(e), false);
    this.el.addEventListener("touchend", (e) => this.dragEnd(e), false);
    // this.el.addEventListener("touchmove", (e) => this.drag(e), false);

    this.el.addEventListener("mousedown", (e) => this.dragStart(e), false);
    this.el.addEventListener("mouseup", (e) => this.dragEnd(e), false);
    // this.el.addEventListener("mousemove", (e) => this.drag(e), false);

    this.dragItem.addEventListener("touchmove", (e) => this.drag(e), false);
    this.dragItem.addEventListener("mousemove", (e) => this.drag(e), false);
    this.dragItem.addEventListener("touchstart", (e) => this.dragStart(e), false);
    this.dragItem.addEventListener("touchend", (e) => this.dragEnd(e));
    this.dragItem.addEventListener("mouseup", (e) => this.dragEnd(e), false);
  }

  private dragStart(e) {
    // e.preventDefault();
    let touchX
    let touchY;

    if (e.type === "touchstart") {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY  
    } else {
      touchX = e.clientX;
      touchY = e.clientY;
    }

    // this.currentY =this.valueToPixels( this.value );
    // this.yOffset = this.currentY;
    this.yOffset =this.valueToPixels( this.value );


    this.initialX = touchX - this.xOffset;
    this.initialY = touchY - this.yOffset;
    this.touchStartY = touchY;

    if (e.target === this.el || e.target === this.dragItem) {
      this.active = true;
    }
  }

  private dragEnd(e) {
    // e.preventDefault();
    console.log("Event: ", e.type);
    this.currentY = e.offsetY;
    this.yOffset = this.currentY;  

    if ( this.currentY < ( 0.5 * this.el.clientHeight ) ) {
      this.currentY = 0;
    } else if ( this.currentY > ( 0.5 * this.el.clientHeight ) ) {
      this.currentY = this.dragItem.clientHeight;
    }

    if ( this.currentY !== undefined ) {
      this.value = this.pixelsToValue(this.currentY);
    }  
    
    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.active = false;

  }


  private drag(e) {
    e.preventDefault();

    if (this.active) {
    
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
      // } else if ( this.currentY > this.el.offsetHeight ) {
      } else if ( this.currentY > this.dragItem.clientHeight ) {
        this.currentY = this.dragItem.clientHeight;
        this.initialY = touchY - this.yOffset;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.value = this.pixelsToValue(this.currentY);
    }
  }

  setTranslate(xPos, yPos, el) {
    if ( el ) {
      el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
    }
  }

  private getText(): string {
    return this.debug;
  }

  render() {
    return (
        <Host>
        <div class="background">
          <div class="slide" ref={slide => this.dragItem = slide as HTMLElement}>
            <ion-icon class="icon" name={`${this.icon}`}></ion-icon>
          </div>
        </div>
        <div>{this.getText()}</div>
        
        </Host>
    );
  }

  


  valueToRatio(value: number, min: number, max: number): number {
    return clamp(0, (value - min) / (max - min), 1);
  };
}
