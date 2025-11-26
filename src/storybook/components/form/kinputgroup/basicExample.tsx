import { KInputGroup } from '@root/src/components/form/kinputgroup';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function BasicExample() {
  const [value, setValue] = useState('');
  return (
    <ExampleWrapper className="flex justify-center">
      <KInputGroup
        prependText="$"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </ExampleWrapper>
  );
}
