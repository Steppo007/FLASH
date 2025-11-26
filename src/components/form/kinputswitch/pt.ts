import { InputSwitchPassThroughOptions } from 'primereact/inputswitch';
import { KInputSwitchProps } from '../kcheckable';
import { classNames } from 'primereact/utils';
import { getKroClassNames } from '../../utils/kroClassNames';

export function getKInputSwitchPTOptions({
  invalid,
  disabled,
  size = 'default',
}: KInputSwitchProps): InputSwitchPassThroughOptions {
  return {
    root: {
      className: classNames(
        'kro-kcheckable kro-kinputswitch',
        getKroClassNames({ invalid, disabled, size })
      ),
    },
    input: {
      className: 'kro-kcheckable-input',
    },
    slider: {
      className: 'kro-kcheckable-box',
    },
  };
}
