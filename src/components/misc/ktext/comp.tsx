import { classNames } from 'primereact/utils';
import { KTextProps } from './types';
import { createElement, forwardRef } from 'react';
/**
 * Returns a KText component
 */
export const KText = forwardRef<HTMLElement, KTextProps>((props, ref) => {
  const { type = 'text', className, ...restProps } = props;

  const cn = classNames('kro-ktext', `type-${type}`, className);
  let elem;
  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'div':
      elem = type;
      break;
    case 'lead':
    case 'text':
    case 'text-sm':
    case 'text-xs':
      elem = 'p';
      break;
    case 'link':
    case 'link-sm':
      elem = 'a';
      break;
  }

  return createElement(elem, { className: cn, ref, ...restProps });
});

KText.displayName = 'KText';
