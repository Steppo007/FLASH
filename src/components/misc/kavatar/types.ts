import { ReactDivProps } from '../../utils/reactProps';

export type AvatarSize = 'small' | 'normal' | 'large' | 'xlarge';

export interface KAvatarProps extends ReactDivProps {
  /**
   * The label of the avatar
   */
  label?: string;
  /**
   * The URL of an image to display
   */
  imageUrl?: string;
  /**
   * an icon to display
   */
  icon?: React.ReactNode;
  /**
   * an optional badge element to pass
   */
  children?: React.ReactNode;
  /**
   * The size of the avatar
   */
  size?: AvatarSize;
  /**
   * Optional description for the avatar
   */
  alt?: string;
}
