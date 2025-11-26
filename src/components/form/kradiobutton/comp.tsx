import { KCheckable, KRadioButtonProps } from '../kcheckable';

export function KRadioButton(props: KRadioButtonProps) {
  return <KCheckable type="radiobutton" props={props} />;
}
