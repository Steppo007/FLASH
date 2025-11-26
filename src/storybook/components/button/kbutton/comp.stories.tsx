import type { Meta, StoryObj } from '@storybook/react-vite';
import { KButton, KButtonProps } from '@complib/button/kbutton';
import { svgStorybookMapObject } from '@sbook/utils';
import { iconSvgs } from '@sbook/svgComponents.autogen';
import { argDescriptions } from '../../argDescriptions';

const metaData = {
  title: 'Components/Button/KButton',
  component: KButton,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2405-10290&mode=dev',
    },
  },
  argTypes: {
    icon: {
      options: [...iconSvgs, 'none'],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    ...argDescriptions.disabled,
    tooltip: {
      description: 'tooltip text for the button',
    },
  },
  render: (props: KButtonProps) => {
    return (
      <KButton
        {...props}
        badgeClassName="kro-kbadge severity-danger size-large"
      />
    );
  },
} satisfies Meta<typeof KButton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    variant: 'primary',
    critical: false,
    size: 'default',
    label: 'Krones',
    icon: 'none',
    iconPos: 'left',
    disabled: false,
    tooltip: '',
    badge: '',
  },
};
