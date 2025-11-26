import { classNames } from 'primereact/utils';
import { KCheckboxProps } from '../kcheckable';
import { getKroClassNames } from '../../utils/kroClassNames';
import { CheckboxPassThroughOptions } from 'primereact/checkbox';

export function getKCheckboxPTOptions({
  invalid,
  disabled,
  size = 'default',
}: Omit<KCheckboxProps, 'checked'>): CheckboxPassThroughOptions {
  return {
    root: {
      className: classNames(
        'kro-kcheckbox kro-kcheckable',
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
