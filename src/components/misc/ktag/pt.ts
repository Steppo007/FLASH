import type { TagPassThroughOptions } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { KTagProps } from '.';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact Tag component take the form of the Krones KTag component.
 */
export function getKTagPTOptions({
  severity,
  rounded,
}: KTagProps): TagPassThroughOptions {
  return {
    root: {
      className: classNames('kro-ktag', `kro-ktag-${severity}`, {
        'kro-ktag-rounded': rounded,
        'kro-ktag-square': !rounded,
      }),
    },
    value: {
      className: 'kro-ktag-value',
    },
  };
}
