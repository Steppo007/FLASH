import KMenu from '@root/src/components/menu/kmenu';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { MenuItem } from 'primereact/menuitem';

export default function CustomExample() {
  const model: MenuItem[] = [
    {
      label: 'A Very Long Header Bla Bla Bla Bla',
      items: [
        {
          label:
            'A Very Long Label Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla Bla',
        },
        {
          label: 'A Reasonable Label',
        },
      ],
    },
  ];
  return (
    <ExampleWrapper className="flex justify-center">
      <KMenu model={model} className="border-border-default max-w-48 border" />
    </ExampleWrapper>
  );
}
