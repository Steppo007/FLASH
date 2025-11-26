import KInputText from '@root/src/components/form/kinputtext';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function BasicExample() {
  const [value, setValue] = useState('');
  return (
    <ExampleWrapper className="flex justify-center">
      <KInputText value={value} onChange={(e) => setValue(e.target.value)} />
    </ExampleWrapper>
  );
}
