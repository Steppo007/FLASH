// configures meta data for component in storybook

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KIconButton, KIconButtonProps } from '@complib/button/kiconbutton';
import { argDescriptions } from '../../argDescriptions';
import { iconSvgs } from '@root/src/storybook/svgComponents.autogen';
import { svgStorybookMapObject } from '@root/src/storybook/utils';

const metaData = {
  title: 'Components/Button/KIconButton',
  component: KIconButton,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?node-id=2510-6783&t=Eh8PS89W9iA6vai7-0',
    },
  },
  argTypes: {
    icon: {
      options: [...iconSvgs],
      mapping: svgStorybookMapObject,
      control: { type: 'select' },
    },
    ...argDescriptions.disabled,
    tooltip: {
      description: 'tooltip text for the button',
    },
  },
  render: (props: KIconButtonProps) => {
    return (
      <KIconButton
        {...props}
        badgeClassName="kro-kbadge severity-danger size-large"
      />
    );
  },
} satisfies Meta<typeof KIconButton>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    variant: 'primary',
    critical: false,
    size: 'default',
    icon: 'accountFigure',
    disabled: false,
    tooltip: '',
    badge: '',
  },
};
