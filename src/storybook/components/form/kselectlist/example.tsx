import { KSelectList } from '@root/src/components/form/kselectlist';
import { ExampleWrapper } from '@sbook/utils';
import { useState } from 'react';
export default function Example() {
  const [value, setValue] = useState<string>('en-GB');

  return (
    <ExampleWrapper className="flex items-center justify-center">
      <div className="w-80">
        <KSelectList
          options={[
            { label: 'English (UK)', value: 'en-GB' },
            { label: 'Deutsch', value: 'de-DE' },
          ]}
          value={value}
          onSelect={setValue}
        />
      </div>
    </ExampleWrapper>
  );
}
