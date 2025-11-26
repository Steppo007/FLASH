import { ReactDivProps } from '../../utils/reactProps';

export type KTileView = 'tile' | 'list';

export interface KTileProps extends ReactDivProps {
  /**
   * The label of the tile. Designed to cut off with ellipsis after two lines of text.
   */
  label?: string;
  /**
   * The content to display in the tile. The following HTML elements receive automatic styling:
   *  - svg elements: color and size
   *  - text elements: color
   */
  children?: React.ReactNode;
  /**
   * How to display the tile. In
   * 'tile' view, the content square is big, and the text
   * is placed below. In 'list' view, the square is
   * small and the text is placed to the right.
   */
  view: KTileView;
  /**
   * Whether to display the KTile in grey colors
   */
  greyedOut?: boolean;
}
