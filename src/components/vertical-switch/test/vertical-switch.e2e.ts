import { newE2EPage } from '@stencil/core/testing';

describe('vertical-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vertical-switch></vertical-switch>');

    const element = await page.find('vertical-switch');
    expect(element).toHaveClass('hydrated');
  });
});
