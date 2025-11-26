import KInputDropdown from '@root/src/components/form/kinputdropdown';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { useState } from 'react';

export function VirtualScrollExample() {
  interface City {
    name: string;
    code: string;
  }
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities: City[] = Array.from({ length: 1000 }).map((_value, index) => ({
    name: `City ${index}`,
    code: index.toString(),
  }));

  return (
    <ExampleWrapper className="flex items-center gap-8">
      <KInputDropdown
        size={'default'}
        value={selectedCity}
        placeholder="Select a City"
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        className="w-96"
        virtualScrollerOptions={{ itemSize: 40 }}
        filter
      />
    </ExampleWrapper>
  );
}
