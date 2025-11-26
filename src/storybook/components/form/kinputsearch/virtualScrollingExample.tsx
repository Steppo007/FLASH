import KInputSearch from '@root/src/components/form/kinputsearch';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { useState } from 'react';

const items = Array.from({ length: 100000 }).map((_, i) => ({
  label: `Item #${i}`,
  value: i,
}));

export function VirtualScrollingExample() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState<unknown[]>([]);

  const searchItems = (event: AutoCompleteCompleteEvent) => {
    setFilteredItems(
      items.filter((item) =>
        item.label.toLowerCase().startsWith(event.query.toLowerCase())
      )
    );
  };

  return (
    <ExampleWrapper className="flex justify-center">
      <KInputSearch
        field="label"
        value={selectedItem}
        suggestions={filteredItems}
        completeMethod={searchItems}
        virtualScrollerOptions={{ itemSize: 38 }}
        onChange={(event) => setSelectedItem(event.value)}
        floatLabel="Virtual scrolling"
        className="w-72"
      />
    </ExampleWrapper>
  );
}
