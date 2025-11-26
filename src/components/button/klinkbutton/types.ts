import { ReactButtonProps } from '../../utils/reactProps';
import { ReactNode } from 'react';

export type KLinkButtonSize = 'small' | 'default';

export interface KLinkButtonProps extends ReactButtonProps {
  /**
   * the size of the link button
   */
  size?: KLinkButtonSize;
  /**
   * the label of the button
   */
  label?: string;
  /**
   * whether or not the button should include a right-pointing
   * arrow on the left side
   */
  showArrow?: boolean;

  iconEnd?: ReactNode;
}
