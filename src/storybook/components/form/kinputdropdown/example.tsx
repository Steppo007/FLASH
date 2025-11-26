import { KInputDropdown } from '@root/src/components/form/kinputdropdown';
import { KText } from '@root/src/components/misc/ktext';
import { ExampleWrapper } from '@sbook/utils';
import { useState } from 'react';

export function Example() {
  interface City {
    name: string;
    code: string;
  }
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  const selectedCityName = selectedCity ? selectedCity.name : '';
  const isCityNewYork = selectedCityName === 'New York';

  return (
    <ExampleWrapper className="flex flex-col items-center gap-8">
      <KInputDropdown
        size={'default'}
        invalid={isCityNewYork}
        helperText={isCityNewYork ? 'Invalid choice' : undefined}
        value={selectedCity}
        placeholder="Select a City"
        onChange={(e) => setSelectedCity(e.value)}
        options={cities}
        optionLabel="name"
        className="w-48"
      />
      <KText type="text">{`Selected City: ${selectedCityName}`}</KText>
    </ExampleWrapper>
  );
}
