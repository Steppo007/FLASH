import { KSize } from '../../utils/kroClassNames';

export interface KProgressSpinnerProps {
  /**
   * the size of the component
   */
  size?: KSize;
  /**
   * the width of the stroke
   */
  strokeWidth?: number;
  /**
   * duration of the animation
   */
  animationDurationMillis?: number;
}
