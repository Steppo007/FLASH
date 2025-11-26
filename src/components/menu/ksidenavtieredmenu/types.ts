import { TieredMenuProps } from 'primereact/tieredmenu';
import { KeyedMenuItem } from '../../utils/menuModelProcessing';

export interface KSideNavTieredMenuProps extends TieredMenuProps {
  model: KeyedMenuItem[];
}
