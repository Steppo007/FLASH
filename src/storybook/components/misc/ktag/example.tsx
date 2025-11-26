import { KTag } from '@root/src/components/misc/ktag';
import Connect from '@root/assets/svgs/products/connect.svg?react';

export function Example() {
  const severities = [
    'success',
    'warning',
    'danger',
    'neutral',
    'info',
  ] as const;

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {severities.map((severity) => {
        return (
          <KTag
            key={severity}
            icon={<Connect />}
            value={severity.toUpperCase()}
            severity={severity}
            rounded
          />
        );
      })}
    </div>
  );
}
