import { RadioButtonPassThroughOptions } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { KRadioButtonProps } from '../kcheckable';
import { getKroClassNames } from '../../utils/kroClassNames';

export function getKRadioButtonPTOptions({
  invalid,
  disabled,
  size = 'default',
}: KRadioButtonProps): RadioButtonPassThroughOptions {
  return {
    root: {
      className: classNames(
        'kro-kradiobutton kro-kcheckable',
        getKroClassNames({ invalid, disabled, size })
      ),
    },
    input: {
      className: 'kro-kcheckable-input',
    },
    box: {
      className: 'kro-kcheckable-box',
    },
    icon: {
      className: 'kro-kcheckable-icon',
    },
  };
}
