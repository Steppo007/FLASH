import { PickList } from 'primereact/picklist';
import { KPickListProps } from '.';
import { getKPickListPTOptions } from './pt';

export function KPickList(props: KPickListProps) {
  return <PickList {...props} pt={getKPickListPTOptions()} />;
}
