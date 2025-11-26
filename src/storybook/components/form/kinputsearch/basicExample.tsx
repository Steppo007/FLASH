import KInputSearch from '@root/src/components/form/kinputsearch';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { useState } from 'react';

export function BasicExample() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    setItems([...Array(10).keys()].map((item) => event.query + '-' + item));
  };

  return (
    <ExampleWrapper className="flex justify-center">
      <KInputSearch
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(event) => setValue(event.value)}
        placeholder="type something"
        className="w-72"
      />
    </ExampleWrapper>
  );
}
