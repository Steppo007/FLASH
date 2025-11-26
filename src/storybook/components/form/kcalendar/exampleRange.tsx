import { KCalendar } from '@root/src/components/form/kcalendar';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { FormEvent } from 'primereact/ts-helpers';
import { useState } from 'react';

export function ExampleRangeSelection() {
  const [value, setValue] = useState<Date[]>();

  return (
    <ExampleWrapper className="flex justify-center">
      <KCalendar
        value={value}
        selectionMode="range"
        floatLabel="Select a date range"
        helperText="Helper text"
        onChange={(e: FormEvent<Date[]>) => {
          setValue(e.value ?? undefined);
        }}
      />
    </ExampleWrapper>
  );
}
