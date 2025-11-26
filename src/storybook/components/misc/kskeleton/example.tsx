import { KSkeleton } from '@complib/misc/kskeleton';
import { ExampleWrapper } from '@sbook/utils';

export default function Example() {
  return (
    <ExampleWrapper>
      <div className="mb-4 flex items-center gap-3">
        <KSkeleton shape="circle" size="4rem" />
        <div className="flex flex-col justify-evenly gap-1 self-stretch">
          <KSkeleton
            shape="rectangle"
            height="1rem"
            width="10rem"
            borderRadius="1rem"
          />
          <KSkeleton
            shape="rectangle"
            height="1rem"
            width="15rem"
            borderRadius="1rem"
          />
        </div>
      </div>
      <KSkeleton shape="rectangle" height="4rem" borderRadius="1rem" />
    </ExampleWrapper>
  );
}
