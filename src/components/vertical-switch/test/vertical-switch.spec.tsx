import { newSpecPage } from '@stencil/core/testing';
import { VerticalSwitch } from '../vertical-switch';

describe('vertical-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [VerticalSwitch],
      html: `<vertical-switch></vertical-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <vertical-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </vertical-switch>
    `);
  });
});
