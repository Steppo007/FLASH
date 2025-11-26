import { useState } from 'react';
import Clipboard from '@root/assets/svgs/icons/clipboard.svg?react';
import Check from '@root/assets/svgs/icons/check.svg?react';
import InfoOutlined from '@root/assets/svgs/icons/infoOutlined.svg?react';

import { KInteractiveIcon } from '@root/src/components/misc/kinteractiveicon';
import { ExampleWrapper } from '@sbook/utils';

export function Example() {
  const [isCopied, setIsCopied] = useState(false);
  const icon = isCopied ? <Check /> : <Clipboard />;
  const tooltipLabel = isCopied ? 'Copied!' : 'Copy to Clipboard';
  return (
    <ExampleWrapper className="flex items-center justify-center gap-3">
      <KInteractiveIcon
        icon={<InfoOutlined />}
        tooltipLabel={
          'Hover and click the other icon to see the behavior of the tooltip.'
        }
        tooltipPosition="top"
      />
      <KInteractiveIcon
        icon={icon}
        tooltipLabel={tooltipLabel}
        tooltipPosition="top"
        onClick={() => {
          setIsCopied(true);
        }}
      />
    </ExampleWrapper>
  );
}
