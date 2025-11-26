import { KSeverityBadge } from '@complib/misc/kseveritybadge';
import { ExampleWrapper } from '@sbook/utils';

export default function Example() {
  return (
    <ExampleWrapper className="flex items-center justify-center gap-4">
      <KSeverityBadge severity="info" />
      <KSeverityBadge severity="warn" />
      <KSeverityBadge severity="error" />
    </ExampleWrapper>
  );
}
