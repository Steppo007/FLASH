import { ReactSpanProps } from '../../utils/reactProps';

export const textTypes = [
  'h1',
  'h2',
  'h3',
  'h4',
  'lead',
  'text',
  'text-sm',
  'text-xs',
  'link',
  'link-sm',
  'div',
] as const;
export type KTextType = (typeof textTypes)[number];

export interface KTextProps extends ReactSpanProps {
  /**
   * The type of text to use, which determines the style.
   */
  type?: KTextType;
}
