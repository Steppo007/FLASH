import { KRadioButton } from '@root/src/components/form/kradiobutton';

export function SingleExample() {
  return (
    <KRadioButton
      name="language"
      value={'spanish'}
      inputId={'language-spanish'}
      label={'Spanish'}
      invalid={false}
      size={'default'}
    />
  );
}
