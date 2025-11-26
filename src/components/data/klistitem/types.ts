import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { KTextProps } from '../../misc/ktext';
import { ReactDivProps } from '../../utils/reactProps';
import { ButtonPassThroughOptions } from 'primereact/button';

export interface KListItemPassThroughOptions {
  /**
   * Used to pass attributes to the overline's DOM element.
   */
  overline?: KTextProps /**
   * Used to pass attributes to the headline's DOM element.
   */;
  headline?: KTextProps /**
   * Used to pass attributes to the supportingText's DOM element.
   */;
  supportingText?: KTextProps;
  /**
   * Used to pass attributes to the textContainer's DOM element.
   */
  textContainer?: ReactDivProps | ButtonPassThroughOptions;
}

export interface KListItemBaseProps {
  /**
   * The item shown at the start of the list item.
   */
  leadingItem?: ReactNode;
  /**
   * The main text of the list item.
   */
  headline?: string;
  /**
   * A extra small text appearing above the headline.
   */
  overline?: string;
  /**
   * Used to pass attributes to DOM elements inside the component.
   */
  pt?: KListItemPassThroughOptions;
  /**
   * A small text appearing below the headline.
   */
  supportingText?: string;
  /**
   * The item shown at the end of the list item.
   */
  trailingItem?: ReactNode;
}

export type KListItemComponent = Extract<
  ElementType,
  'a' | 'button' | 'div' | 'span'
>;

export type KListItemProps<TRoot extends KListItemComponent> =
  KListItemBaseProps &
    Omit<ComponentPropsWithRef<TRoot>, keyof KListItemBaseProps> & {
      /**
       * The component to render.
       *
       * Determines if the interactive states are enabled or not.
       * - Enabled: `button`
       * - Disabled: `div`, `li`, `span`
       * @default 'button'
       */
      component?: TRoot;
    };
