import { KCalendarProps } from '@root/src/components/form/kcalendar';
import { KCalendar } from '@root/src/components/form/kcalendar';
import { FormEvent } from 'primereact/ts-helpers';
import { useState } from 'react';

export function KCalendarSingle(props: KCalendarProps<'single', Date>) {
  const [value, setValue] = useState<Date>();

  return (
    <KCalendar
      value={value}
      onChange={(e: FormEvent<Date>) => {
        setValue(e.value ?? undefined);
      }}
      {...props}
    />
  );
}

export function KCalendarMultiple(props: KCalendarProps<'multiple', Date[]>) {
  const [value, setValue] = useState<Date[]>();

  return (
    <KCalendar
      value={value}
      onChange={(e: FormEvent<Date[]>) => {
        setValue(e.value ?? undefined);
      }}
      {...props}
    />
  );
}

export function KCalendarRange(props: KCalendarProps<'range', Date[]>) {
  const [value, setValue] = useState<Date[]>();

  return (
    <KCalendar
      value={value}
      onChange={(e: FormEvent<Date[]>) => {
        setValue(e.value ?? undefined);
      }}
      {...props}
    />
  );
}
