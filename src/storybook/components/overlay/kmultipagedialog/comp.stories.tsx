import type { Meta, StoryObj } from '@storybook/react-vite';
import { KMultiPageDialog } from '@root/src/components/overlay/kmultipagedialog';
import { model } from './exampleBasic';
import { KButton } from '@root/src/components/button/kbutton';
import { getSliceMapping } from '@root/src/storybook/utils';

const sliceMapping = getSliceMapping(model, (x) => x + ' pages');
const PrimaryButton = () => <KButton size="default" label="Primary Action" />;
const SecondaryButton = () => (
  <KButton size="default" label="Secondary Action" variant="outlined" />
);

const metaData = {
  title: 'Components/Overlay/KMultiPageDialog',
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=3680-27104&mode=design&t=K0fcBHEi2wiU1l0j-0',
    },
    controls: {
      exclude: ['visible', 'onHide'],
    },
  },
  argTypes: {
    model: {
      options: Object.keys(sliceMapping).slice(1),
      control: 'radio',
      mapping: sliceMapping,
    },
    footer: {
      options: ['none', 'primary', 'primary and secondary'],
      control: 'radio',
      mapping: {
        none: undefined,
        primary: <PrimaryButton />,
        'primary and secondary': (
          <>
            {<PrimaryButton />}
            {<SecondaryButton />}
          </>
        ),
      },
    },
  },
  component: KMultiPageDialog,
} satisfies Meta<typeof KMultiPageDialog>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    model: model,
    footer: 'none',
    header: 'Settings',
    visible: true,
    onHide: () => undefined,
  },
};
