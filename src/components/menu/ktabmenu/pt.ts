import {
  TabMenuPassThroughOptions,
  TabMenuThroughMethodOptions,
} from 'primereact/tabmenu';
import { KTabMenuPTProps } from '.';
import { classNames } from 'primereact/utils';

/**
 * @returns the Primereact pass-through options which make the
 * Primereact Tab Menu component take the form of the Krones KTabMenu component.
 */
export function getKTabMenuPTOptions(
  props: KTabMenuPTProps
): TabMenuPassThroughOptions {
  return {
    root: {
      className: classNames('kro-ktabmenu', `size-${props.size}`),
    },
    label: {
      className: 'kro-line-clamp-1 ',
    },
    action: {
      className: 'kro-outline-when-focus-visible',
    },
    menuitem: (options: TabMenuThroughMethodOptions) => {
      const inControlledMode = !!options.props.onTabChange;
      const objectWithActiveIndex = inControlledMode
        ? options.props
        : options.state;
      const isActive =
        options.context.index === objectWithActiveIndex.activeIndex;
      return {
        className: isActive ? 'isActive' : undefined,
      };
    },
  };
}
