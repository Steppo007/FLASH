import { PanelMenuProps } from 'primereact/panelmenu';
import { KeyedMenuItem } from '../../utils/menuModelProcessing';

export interface KSideNavPanelMenuProps extends PanelMenuProps {
  model: KeyedMenuItem[];
}
