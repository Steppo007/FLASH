import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/storybook/Introduction.mdx', // default page
    '../src/storybook/**/*.mdx',
    '../src/storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-designs',
    '@vueless/storybook-dark-mode',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [{ from: '../src/storybook/assets', to: '/' }],
};
export default config;
