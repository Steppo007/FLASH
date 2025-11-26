import {
  KSeverityIcon,
  severityTypes,
} from '@root/src/components/misc/kseverityicon';
import { ExampleWrapper } from '@sbook/utils';
import Connect from '@root/assets/svgs/products/connect.svg?react';
import AdvancedAnalytics from '@root/assets/svgs/products/advancedAnalytics.svg?react';

export default function Example() {
  return (
    <ExampleWrapper className="flex items-center justify-between">
      {severityTypes.map((severity) => {
        return (
          <KSeverityIcon
            key={`${severity}advancedAnalytics`}
            severity={severity}
            size="large"
            icon={<AdvancedAnalytics />}
          />
        );
      })}
      {severityTypes.map((severity) => {
        return (
          <KSeverityIcon
            key={`${severity}connect`}
            severity={severity}
            size="large"
            icon={<Connect />}
          />
        );
      })}
    </ExampleWrapper>
  );
}
