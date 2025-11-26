import KInputText from '@root/src/components/form/kinputtext';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function AdvancedExample() {
  const [value, setValue] = useState('');
  const valid = /^[a-zA-Z ]*$/.test(value);

  return (
    <ExampleWrapper className="flex justify-center">
      <KInputText
        value={value}
        onChange={(e) => setValue(e.target.value)}
        floatLabel="Enter your name"
        helperText="Allowed characters: a-z, A-Z, space"
        tooltipLabel="This should be your full legal name"
        tooltipPosition="right"
        invalid={!valid}
        disabled={false}
        className="w-72"
      />
    </ExampleWrapper>
  );
}
