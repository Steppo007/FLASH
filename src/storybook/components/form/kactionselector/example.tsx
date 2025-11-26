import {
  KActionSelector,
  KActionSelectorProps,
} from '@complib/form/kactionselector';
import { useState } from 'react';
import { SelectItemOptionsType } from 'primereact/selectitem';

export function ExampleKActionSelector(
  props: { singleItemArray?: boolean } & Pick<
    KActionSelectorProps,
    | 'noBoundaryStyling'
    | 'buttonLabel'
    | 'overlayHeader'
    | 'overlayHint'
    | 'label'
  >
) {
  let options: SelectItemOptionsType = [
    {
      label: 'Rome',
      value: 'rome',
    },
    {
      label: 'Paris',
      value: 'paris',
    },
  ];

  if (props.singleItemArray) {
    options = [options[0]];
  }

  const [city, setCity] = useState<string>(options[0].value);

  const command = () => {
    console.log('We are going to ' + city);
  };

  return (
    <KActionSelector
      {...props}
      options={options}
      value={city}
      onSelectValue={setCity}
      buttonUrl="https://www.google.com"
      buttonCommand={command}
      className="w-[392px]"
    />
  );
}
