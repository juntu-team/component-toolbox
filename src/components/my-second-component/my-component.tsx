import { Component, /* Listen, */ /* ComponentInterface, */ /* Element, */ /* Event, EventEmitter, Host, */ Prop, /* State, */ /* Watch, */ h } from '@stencil/core';

import { format } from '../../utils/utils';

@Component({
  tag: 'my-second-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MySecondComponent {
  // @Element() private element: HTMLElement;
  rangeInput!: HTMLInputElement; // Added for this error Cannot read property 'addEventListener'
  divElement!: HTMLElement; // define a variable for html element

  // @Element() private element: HTMLElement;
  // @State() count: number = 0;

  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  @Prop() value: number = 25;

  // @Listen('click', { capture: true })
  //   handleChangeEvent() {
  //     console.log("Click");
  //   }

  componentWillLoad() {
  }

  componentDidLoad() {
    // this.rangeInput.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   e.stopImmediatePropagation();
    //   console.log("stop ev");
    // });
    console.log("componentDidLoad");
  }

  connectedCallback() {
    console.log("connectedCallback");
  }
  
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  updateValue(event: Event) {
      this.value = parseInt((event.target as HTMLInputElement).value);
      // this.value = parseInt(this.host.value);
      console.log("Val: ", this.value);
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <div>
        <h1 class="regler-wertung">Value: <span>{this.value}</span></h1>
        <input 
          type="range" id="myRange" class="slider" min="0" max="100"
          onInput={(event: Event) => this.updateValue(event)}
          ref={el => this.rangeInput = el as HTMLInputElement}>
        </input>  
        Hello, World! I'm BAD Mother FUCKER {this.getText()}
      </div>
    );
  }
}
