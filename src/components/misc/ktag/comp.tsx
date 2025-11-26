import { Tag } from 'primereact/tag';
import { KTagProps } from './types';
import { getKTagPTOptions } from './pt';

/**
 * Returns a KTag component with pre-configured styling via PT options.
 */
export function KTag(props: KTagProps) {
  const ptOptions = getKTagPTOptions(props);
  const severity = props.severity === 'neutral' ? 'secondary' : props.severity;

  return <Tag {...props} severity={severity} pt={ptOptions} unstyled />;
}
