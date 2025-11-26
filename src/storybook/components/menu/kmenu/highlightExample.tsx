import KMenu from '@root/src/components/menu/kmenu';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';
import { useState } from 'react';

export default function HighlightExample() {
  const [theme, setTheme] = useState('light');

  const model: MenuItem[] = [
    {
      label: 'Theme',
      items: [
        {
          label: 'Light',
          command: () => {
            setTheme('light');
          },
          className: classNames({ 'kro-highlighted': theme === 'light' }),
        },
        {
          label: 'Dark',
          command: () => {
            setTheme('dark');
          },
          className: classNames({ 'kro-highlighted': theme === 'dark' }),
        },
      ],
    },
  ];

  return (
    <ExampleWrapper className="flex justify-center">
      <KMenu model={model} className="w-48" />
    </ExampleWrapper>
  );
}
