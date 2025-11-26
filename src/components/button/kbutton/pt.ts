import { ButtonPassThroughOptions } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { getKroClassNames } from '../../utils/kroClassNames';
import { KButtonProps } from '.';

export function getKButtonClassName({
  iconPos = 'left',
  size = 'default',
  variant = 'primary',
  critical = false,
}: KButtonProps) {
  return classNames(
    getKroClassNames({ variant, size, iconPos, critical }),
    'kro-kbutton',
    'kro-kbuttonbase',
    'kro-outline-when-focused'
  );
}

export function getKButtonPTOptions(
  props: KButtonProps
): ButtonPassThroughOptions {
  return {
    root: {
      className: getKButtonClassName(props),
    },
  };
}
