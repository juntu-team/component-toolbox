import { Component, /* Listen, */ /* ComponentInterface, */ Element, Event, EventEmitter, Host, Prop, writeTask,/* State, */ Watch, h } from '@stencil/core';
import { RangeChangeEventDetail/* , RangeValue */ } from './vertical-switch-interface';
// import { clamp, convertRange } from '../../utils/utils';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import 'ionicons';

@Component({
  tag: 'vertical-switch',
  styleUrl: 'vertical-switch.css',
  shadow: true
})
export class VerticalSlider {
  @Element() hostElement: HTMLElement;


  // private background;
  private dragItem;

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


    if (!this._debounce) {
      // value = Math.trunc(value);
      this.junChange.emit({ value });
      this._debounce = true;
      setTimeout(() => {
        this._debounce = false;
      }, this.debounce);  
    }
  }




  async connectedCallback() {
    console.log("connectedCallback");
  }


    // async componentWillLoad() {
  //   console.log("componentWillLoad");
  // }

  async componentDidLoad() {
    this.hostElement.addEventListener("touchstart", (e) => { e.preventDefault() }, false);
    // this.el.addEventListener("touchend", (e) => this.dragEnd(e), false);
    // this.el.addEventListener("touchmove", (e) => this.drag(e), false);

    this.hostElement.addEventListener("mousedown", (e) => { e.preventDefault() }, false);
    // this.el.addEventListener("mousedown", (e) => this.dragStart(e), false);
    // this.el.addEventListener("mouseup", (e) => this.dragEnd(e), false);
    // this.el.addEventListener("mousemove", (e) => this.drag(e), false);

    await this.initGesture();
  }

  // if ( this.currentY < 0 ) {
  //   this.currentY = 0;
  // } else if ( this.currentY > ( this.el.offsetHeight - this.dragItem.clientHeight ) ) {
  //   this.currentY = this.el.offsetHeight - this.dragItem.clientHeight;
  // }

  async initGesture() {
    const style = this.dragItem.style;
    const slideHeight = ( this.hostElement.offsetHeight - this.dragItem.clientHeight );
    let actPos;
    const options: GestureConfig = {
      el: this.dragItem,
      gestureName: 'sliderer',
      gesturePriority: 100,
      direction: 'y',
      threshold: 5,
      passive: false,
      onStart: () => {
        console.log('onStart');
        style.transition = 'none';
      },
      onMove: (ev) => {
        console.log('onMove');
        let delta: number;
        delta = actPos + ev.deltaY;
        delta = ( delta < 0 ? 0 : (delta > slideHeight ? slideHeight : delta) );
        style.transform = `translateY(${delta}px)`;
      },
      onEnd: (ev) => {
        console.log('onEnd');
        style.transition = '0.2s ease-out';
        if (ev.deltaY > slideHeight / 2) {
          style.transform = `translateY(${slideHeight}px)`;
          actPos = slideHeight;
          // this.match.emit(true);
        } else if (ev.deltaY < slideHeight / 2) {
          style.transform = `translateY(${0}px)`;
          actPos = 0;
          // this.match.emit(false);
        } else {
          style.transform = '';
        }
      },
    };
    const gesture: Gesture = await createGesture(options);
    gesture.enable();
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

  
}
