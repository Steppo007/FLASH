import { ReactDivProps } from '../../utils/reactProps';

export interface KProductCardProps extends ReactDivProps {
  /**
   * the image to display at the top of the card. Inline svg's
   * are automatically centered, recolored, and resized, while img
   * elements are proportionally resized to cover the entire header.
   */
  header?: React.ReactNode;
  /**
   * the title of the card. Cuts off with ellipses after two lines of text.
   */
  title?: string;
  /**
   * Text to display below the title. Will cut off with ellipses
   * after five lines, by default.
   */
  body?: string;
  /**
   * a footer to display at the bottom of the card. It is recommended that
   * a sequence of (at most two) buttons is passed. The footer has a
   * flex-row layout with a pre-defined gap.
   */
  footer?: React.ReactNode;
}
