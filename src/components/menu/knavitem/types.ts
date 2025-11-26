import { ReactButtonProps } from '../../utils/reactProps';

export interface KNavItemProps extends ReactButtonProps {
  /**
   * whether or not the button should be highlighted, to indicate it is active
   */
  isHighlighted?: boolean;
  /**
   * whether or not to automatically position a badge child element
   */
  positionBadge?: boolean;
  /**
   * the label of the navigation item
   */
  label?: string;
  /**
   * the icon for the navigation item
   */
  icon?: React.ReactNode;
  /**
   * where to position the icon
   */
  iconPos?: 'left' | 'right';

  iconEnd?: React.ReactNode;
}
