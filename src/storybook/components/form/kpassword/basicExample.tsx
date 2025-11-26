import { KPassword } from '@root/src/components/form/kpassword';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function BasicExample() {
  const [value, setValue] = useState('');

  return (
    <ExampleWrapper className="flex justify-center">
      <KPassword
        value={value}
        onChange={(e) => setValue(e.target.value)}
        floatLabel="Password"
        toggleMask
      />
    </ExampleWrapper>
  );
}
