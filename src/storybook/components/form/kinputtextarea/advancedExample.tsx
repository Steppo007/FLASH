import KInputTextarea from '@root/src/components/form/kinputtextarea';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export default function AdvancedExample() {
  const [value, setValue] = useState('');
  const valid = /^[a-zA-Z .@\n]*$/.test(value);

  return (
    <ExampleWrapper className="flex justify-center">
      <KInputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        floatLabel="Name and e-mail address"
        helperText="Allowed characters: a-z, A-Z, space, ., @, newline"
        invalid={!valid}
        disabled={false}
        rows={3}
        cols={36}
      />
    </ExampleWrapper>
  );
}
