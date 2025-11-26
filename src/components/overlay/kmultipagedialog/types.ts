import { DialogProps } from 'primereact/dialog';

export interface KMultiPageDialogProps
  extends Omit<DialogProps, 'children' | 'pt' | 'unstyled'> {
  /**
   * the model which governs the side menu and content pages
   */
  model: KDialogPage[];
  /**
   * id of the page from the model to be shown
   */
  activePageId?: string;
  /**
   * Callback that happens the user wants to select a page.
   * If not provided, the state of active page will be handled inside the component
   */
  onPageChange?: (newPageId: string) => void;
}

export interface KDialogPage {
  /**
   * a unique id of this item
   */
  id: string;
  /**
   * a label to display in the side menu
   */
  label: string;
  /**
   * an icon to display in the side menu
   */
  icon?: React.ReactNode;
  /**
   * the content to display when this menu item is clicked
   */
  content: React.ReactNode;
}
