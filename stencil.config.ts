import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'component-toolbox',
  globalStyle: 'src/global/variables.css',
  outputTargets: [
    {
      type: 'dist',
      // esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
