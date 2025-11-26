import type { Meta, StoryObj } from '@storybook/react-vite';
import { KMegaMenu, KMegaMenuProps } from '@complib/menu/kmegamenu';
import { ExampleMegaMenu } from '@sbook/components/menu/kmegamenu/example.tsx';

const metaData = {
  title: 'Components/Menu/KMegaMenu',
  component: KMegaMenu,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=4599-5265&mode=dev',
    },
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    panelClassName: {
      table: {
        disable: true,
      },
    },
    maxColumnWidthDesktop: {
      table: {
        disable: true,
      },
    },
    linkPreventDefault: {
      table: {
        disable: true,
      },
    },
    activeId: {
      table: {
        disable: true,
      },
    },
    breakpoint: {
      control: 'select',
      options: ['480px', '768px', '1024px', null],
    },
    minColumnWidthDesktop: {
      control: 'select',
      options: ['150px', '300px', undefined],
    },
  },
  render: (args: KMegaMenuProps) => {
    return (
      <ExampleMegaMenu
        breakpoint={args.breakpoint}
        minColumnWidthDesktop={args.minColumnWidthDesktop}
      />
    );
  },
} satisfies Meta<typeof KMegaMenu>;

export default metaData;
type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    breakpoint: '1024px',
  },
};
