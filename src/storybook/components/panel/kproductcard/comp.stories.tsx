import type { Meta, StoryObj } from '@storybook/react-vite';
import { getSVG } from '@sbook/svgComponents.autogen';
import { KProductCard } from '@complib/panel/kproductcard';
import { KButton } from '@root/src/components/button/kbutton';

const ProductLogo = getSVG('comparativeReporting');
const PlusSign = getSVG('plusSign');

const PrimaryButton = () => (
  <KButton
    label="Add"
    size="default"
    variant="primary"
    icon={PlusSign && <PlusSign />}
  />
);
const SecondaryButton = () => (
  <KButton label="More Information" size="default" variant="outlined" />
);

const metaData = {
  title: 'Components/Panel/KProductCard',
  component: KProductCard,
  tags: [],
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/8hjJp1mUh5U2tZixhJrenI/%E2%9D%96-Core-Library?type=design&node-id=2648-4349&mode=design&t=OWxXZoRxvxT6Fyyq-0',
    },
  },
  argTypes: {
    header: {
      control: 'radio',
      options: ['none', 'svg', 'img'],
      mapping: {
        none: <></>,
        svg: ProductLogo && <ProductLogo />,
        img: <img src="/digitalWaves.png" />,
      },
    },
    footer: {
      control: 'radio',
      options: ['none', 'primary', 'primary and secondary'],
      mapping: {
        none: <></>,
        primary: <>{<PrimaryButton />}</>,
        'primary and secondary': (
          <>
            {<PrimaryButton />}
            {<SecondaryButton />}
          </>
        ),
      },
    },
  },
} satisfies Meta<typeof KProductCard>;
export default metaData;

type Story = StoryObj<typeof metaData>;

export const Story: Story = {
  args: {
    title: 'Krones Product',
    body: 'This is a short sum-up of the power and value of having this product or service at your company.',
    header: 'svg',
    footer: 'primary',
  },
};
