import { KMultiSelect } from '@root/src/components/form/kmultiselect';
import { KText } from '@root/src/components/misc/ktext';
import { ExampleWrapper } from '@sbook/utils';
import { MultiSelectChangeEvent } from 'primereact/multiselect';
import { useState } from 'react';

export function Example() {
  interface City {
    name: string;
    code: string;
  }
  const [selectedCities, setSelectedCities] = useState<City[]>([]);

  const cities: City[] = [
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Munich', code: 'MUN' },
    { name: 'Budapest', code: 'BP' },
  ];

  const isRomeSelected = selectedCities.some((c) => c.name === 'Rome');
  const selectedCitiesLabel = selectedCities?.map((c) => c.name).join(', ');

  return (
    <ExampleWrapper className="flex flex-col items-center gap-8">
      <KMultiSelect
        value={selectedCities}
        onChange={(e: MultiSelectChangeEvent) => setSelectedCities(e.value)}
        display="chip"
        options={cities}
        optionLabel="name"
        placeholder="Select Cities"
        className="w-64"
        invalid={isRomeSelected}
        helperText={isRomeSelected ? 'Do not select Rome' : ''}
      />
      <KText type="text">{`Selected cities: ${selectedCitiesLabel}`}</KText>
    </ExampleWrapper>
  );
}
