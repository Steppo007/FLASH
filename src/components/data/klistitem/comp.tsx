import { ElementType } from 'react';

import { classNames } from 'primereact/utils';
import { KListItemComponent, KListItemProps } from './types';
import KText, { KTextProps } from '../../misc/ktext';
import { ReactDivProps } from '../../utils/reactProps';

export function KListItem<TRoot extends KListItemComponent = 'button'>({
  children,
  className,
  component,
  leadingItem,
  headline,
  overline,
  pt,
  supportingText,
  trailingItem,
  ...props
}: KListItemProps<TRoot>) {
  const Root = component ?? ('button' as ElementType);

  return (
    <Root
      className={classNames(
        'kro-klistitem kro-outline-when-focused',
        className
      )}
      {...props}
    >
      {leadingItem}
      <TextContainer {...pt?.textContainer}>
        <Overline {...pt?.overline}>{overline}</Overline>
        <HeadLine {...pt?.headline}>{headline ?? children}</HeadLine>
        <SupportingText {...pt?.supportingText}>
          {supportingText}
        </SupportingText>
      </TextContainer>
      {trailingItem}
    </Root>
  );
}

function TextContainer({ className, ...props }: ReactDivProps) {
  return (
    <span className={classNames('kro-text-container', className)} {...props} />
  );
}

function Overline({ className, ...props }: KTextProps) {
  if (props.children === undefined) return null;
  return (
    <KText
      className={classNames('kro-overline kro-line-clamp-1', className)}
      type="text-xs"
      {...props}
    />
  );
}

function HeadLine({ className, ...props }: KTextProps) {
  if (props.children === undefined) return null;
  return (
    <KText
      className={classNames('kro-headline kro-line-clamp-2', className)}
      type="lead"
      {...props}
    />
  );
}

function SupportingText({ className, ...props }: KTextProps) {
  if (props.children === undefined) return null;
  return (
    <KText
      className={classNames('kro-supporting-text kro-line-clamp-2', className)}
      type="text-sm"
      {...props}
    />
  );
}
