import { create } from 'storybook/theming/create';

const lightTheme = create({
  base: 'light',
  brandTitle: 'Krones Storybook',
  brandImage: './Krones.png',
  brandTarget: '_self',
});

const darkTheme = create({
  base: 'dark',
  brandTitle: 'Krones Storybook',
  brandImage: './Krones.png',
  brandTarget: '_self',
});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
