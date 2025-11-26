import './cssImports.css';
import type { Preview, ReactRenderer } from '@storybook/react-vite';
import '@fontsource/roboto/latin.css';
import React, { useLayoutEffect, useState } from 'react';
import { addons } from 'storybook/internal/preview-api';
import { PartialStoryFn } from 'storybook/internal/types';
import { addKronesComponentLocales } from '../src/components/utils/localization';
import { PrimeReactProvider } from 'primereact/api';
import {
  DocsContainer,
  DocsContainerProps,
} from '@storybook/addon-docs/blocks';
import { themes } from './kronesTheme';
import { DARK_MODE_EVENT_NAME } from '@vueless/storybook-dark-mode';

const channel = addons.getChannel();
const preview: Preview = {
  decorators: [PrimeReactLocalizationWrapper, ThemeWrapperWithHook],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      container: ThemeWrapperWithChannel,
    },
    options: {
      storySort: {
        order: [
          'Design Documentation',
          'Components',
          '*',
          'Developer Documentation',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;

// The preview only works correctly when we use the dark mode hook
function ThemeWrapperWithHook(Story: PartialStoryFn<ReactRenderer, unknown>) {
  const isDark = useDarkMode();
  return (
    <ThemeWrapper isDark={isDark}>
      <Story />
    </ThemeWrapper>
  );
}

function PrimeReactLocalizationWrapper(
  Story: PartialStoryFn<ReactRenderer, unknown>
) {
  addKronesComponentLocales();

  return <Story />;
}

// The docs container cannot use a dark mode hook, hence we need to use the channel
function ThemeWrapperWithChannel(props: DocsContainerProps) {
  const isDark = useDarkMode();
  return (
    <ThemeWrapper isDark={isDark}>
      <DocsContainer {...props} theme={isDark ? themes.dark : themes.light} />
    </ThemeWrapper>
  );
}

function ThemeWrapper(props: { isDark?: boolean; children: React.ReactNode }) {
  useLayoutEffect(() => {
    const theme = props.isDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  }, [props.isDark]);

  return <PrimeReactProvider>{props.children}</PrimeReactProvider>;
}

function useDarkMode() {
  const themeFromLocalStorage = getCurrentThemeFromStorage();
  const [isDark, setIsDark] = useState(themeFromLocalStorage === 'dark');
  const eventName = DARK_MODE_EVENT_NAME;

  useLayoutEffect(() => {
    channel.on(eventName, setIsDark);
    return () => channel.off(eventName, setIsDark);
  }, [channel]);

  return isDark;
}
function getCurrentThemeFromStorage(defaultTheme: string = 'light'): string {
  try {
    const storageKey = 'sb-addon-themes-3';
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
      return defaultTheme;
    }

    const parsedData: unknown = JSON.parse(storedData);

    if (
      typeof parsedData === 'object' &&
      parsedData !== null &&
      'current' in parsedData
    ) {
      const current = (parsedData as { current: unknown }).current;
      return typeof current === 'string' ? current : defaultTheme;
    }

    return defaultTheme;
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
    return defaultTheme;
  }
}
