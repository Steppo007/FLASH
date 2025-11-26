import { KSelectButton } from '@root/src/components/form/kselectbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

// the following imports work with vite-plugin-svgr
import Check from '@root/assets/svgs/icons/check.svg?react';
import Close from '@root/assets/svgs/icons/close.svg?react';

export function IconExample() {
  const iconOptions = [
    { icon: <Check />, value: 'yes' },
    { icon: <Close />, value: 'no' },
  ];
  const [value, setValue] = useState(iconOptions[0].value);

  return (
    <ExampleWrapper className="flex justify-center">
      <KSelectButton
        allowEmpty={false}
        value={value}
        onChange={(e) => setValue(e.value)}
        options={iconOptions}
      />
    </ExampleWrapper>
  );
}
