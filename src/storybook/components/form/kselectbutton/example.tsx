import { useState } from 'react';
import { KSelectButton } from '@root/src/components/form/kselectbutton';

export function StoryExample() {
  const textOptions = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  const [value, setValue] = useState(textOptions[0].value);

  return (
    <KSelectButton
      allowEmpty={false}
      value={value}
      onChange={(e) => setValue(e.value)}
      options={textOptions}
    />
  );
}
