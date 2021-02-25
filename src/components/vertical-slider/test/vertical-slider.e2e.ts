import { newE2EPage } from '@stencil/core/testing';

describe('vertical-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vertical-slider></vertical-slider>');

    const element = await page.find('vertical-slider');
    expect(element).toHaveClass('hydrated');
  });
});
