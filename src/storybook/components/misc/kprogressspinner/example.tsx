import { KProgressSpinner } from '@complib/misc/kprogressspinner';
import { kroSizes } from '@root/src/components/utils/kroClassNames';
import { ExampleWrapper } from '@sbook/utils';

export default function Example() {
  return (
    <ExampleWrapper className="flex items-center justify-center">
      {kroSizes.map((size) => {
        return (
          <KProgressSpinner
            key={size}
            size={size}
            strokeWidth={6}
            animationDurationMillis={1500}
          />
        );
      })}
    </ExampleWrapper>
  );
}
