import { KCalendar } from '@root/src/components/form/kcalendar';
import { ExampleWrapper } from '@root/src/storybook/utils';
import { FormEvent } from 'primereact/ts-helpers';
import { useState } from 'react';

export function ExampleMultipleSelection() {
  const [value, setValue] = useState<Date[]>();

  return (
    <ExampleWrapper className="flex justify-center">
      <KCalendar
        value={value}
        selectionMode="multiple"
        floatLabel="Select many dates"
        helperText="Helper text"
        onChange={(e: FormEvent<Date[]>) => {
          setValue(e.value ?? undefined);
        }}
      />
    </ExampleWrapper>
  );
}
