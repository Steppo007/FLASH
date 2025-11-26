import { KInputTextarea } from '@complib/form/kinputtextarea';
import { ExampleWrapper } from '@sbook/utils';
import { useState } from 'react';

export default function BasicExample() {
  const [value, setValue] = useState('');
  return (
    <ExampleWrapper className="flex items-center justify-center">
      <KInputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </ExampleWrapper>
  );
}
