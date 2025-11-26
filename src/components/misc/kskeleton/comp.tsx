import { Skeleton } from 'primereact/skeleton';
import { KSkeletonProps } from '.';
import { classNames } from 'primereact/utils';

export function KSkeleton(props: KSkeletonProps) {
  return (
    <Skeleton
      {...props}
      className={classNames('kro-kskeleton', props.className)}
    />
  );
}
