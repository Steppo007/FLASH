import { KButton } from '@root/src/components/button/kbutton';
import { KProductCard } from '@root/src/components/panel/kproductcard';

// requires vite and vite-plugin-svgr
import PlusSign from '@root/assets/svgs/icons/plusSign.svg?react';

export function Example() {
  return (
    <KProductCard
      header={<svg> ... </svg>}
      title={'Card Title'}
      body="Include the body text for this card here."
      footer={
        <>
          <KButton label="Add" variant="primary" icon={<PlusSign />} />;
          <KButton label="More Information" variant="outlined" />;
        </>
      }
    />
  );
}
