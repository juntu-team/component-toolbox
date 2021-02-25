import { newSpecPage } from '@stencil/core/testing';
import { VerticalSlider } from '../vertical-slider';

describe('vertical-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VerticalSlider],
      html: `<vertical-slider></vertical-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <vertical-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </vertical-slider>
    `);
  });
});
