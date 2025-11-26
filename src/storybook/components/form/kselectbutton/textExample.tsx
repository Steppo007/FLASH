import { KSelectButton } from '@root/src/components/form/kselectbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function TextExample() {
  const textOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];

  const [value, setValue] = useState(textOptions[0].value);

  return (
    <ExampleWrapper className="flex justify-center">
      <KSelectButton
        allowEmpty={false}
        value={value}
        onChange={(e) => setValue(e.value)}
        options={textOptions}
      />
    </ExampleWrapper>
  );
}
