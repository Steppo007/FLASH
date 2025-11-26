import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import KText from '../../misc/ktext';
import { KInteractiveIcon } from '../../misc/kinteractiveicon';
import { RadioButton, RadioButtonProps } from 'primereact/radiobutton';
import { KCheckableProps } from './types';
import { getKCheckboxPTOptions } from '../kcheckbox/pt';
import { getKRadioButtonPTOptions } from '../kradiobutton/pt';
import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch';
import { getKInputSwitchPTOptions } from '../kinputswitch/pt';

const infoIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="info">
      <path
        id="Vector"
        d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
      />
    </g>
  </svg>
);

export function KCheckable({ type, props }: KCheckableProps) {
  const { size = 'default', label, infoIconText, ...checkableProps } = props;

  return (
    <div className="kro-kcheckable-container">
      <label>
        {type === 'checkbox' && (
          <Checkbox
            {...(checkableProps as CheckboxProps)}
            pt={getKCheckboxPTOptions(props)}
            unstyled
          />
        )}
        {type === 'radiobutton' && (
          <RadioButton
            {...(checkableProps as RadioButtonProps)}
            pt={getKRadioButtonPTOptions(props)}
            unstyled
          />
        )}
        {type === 'inputswitch' && (
          <InputSwitch
            {...(checkableProps as InputSwitchProps)}
            pt={getKInputSwitchPTOptions(props)}
            unstyled
          />
        )}
        {label && (
          <KText type={size === 'default' ? 'text-sm' : 'text-xs'}>
            {label}
          </KText>
        )}
      </label>
      {infoIconText && (
        <KInteractiveIcon
          size={size === 'default' ? 'default' : 'small'}
          icon={infoIcon}
          tooltipLabel={infoIconText}
          tooltipPosition="top"
        />
      )}
    </div>
  );
}
