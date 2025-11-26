import { ButtonPassThroughOptions } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { getKroClassNames } from '../../utils/kroClassNames';
import { KIconButtonProps } from './types';

export function getKIconButton({
  size = 'default',
  variant = 'primary',
  critical = false,
}: KIconButtonProps) {
  return classNames(
    getKroClassNames({ variant, size, critical }),
    'kro-kiconbutton',
    'kro-kbuttonbase',
    'kro-outline-when-focused'
  );
}

export function getKButtonPTOptions(
  props: KIconButtonProps
): ButtonPassThroughOptions {
  return {
    root: {
      className: getKIconButton(props),
    },
  };
}
