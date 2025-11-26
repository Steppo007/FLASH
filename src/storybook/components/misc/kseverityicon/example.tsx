import Connect from '@root/assets/svgs/products/connect.svg?react';
import { KSeverityIcon } from '@root/src/components/misc/kseverityicon';

export function Example() {
  return <KSeverityIcon severity="error" size="large" icon={<Connect />} />;
}
