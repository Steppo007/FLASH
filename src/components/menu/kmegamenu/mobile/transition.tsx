import { ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from 'primereact/utils';

// Animation duration in milliseconds - must match CSS transition duration
const MENU_TRANSITION_DURATION_MS = 440;

/**
 * Wrapper component for menu transitions using CSSTransition
 */
export const MenuTransitionWrapper = (props: {
  children: ReactNode;
  isVisible: boolean;
  transitionClassName: string;
}) => {
  const { children, isVisible, transitionClassName } = props;
  const ref = useRef(null);

  return (
    <CSSTransition
      in={isVisible}
      timeout={MENU_TRANSITION_DURATION_MS}
      classNames={classNames(
        'kro-menu-sidebar-menu-animation',
        transitionClassName
      )}
      nodeRef={ref}
      unmountOnExit
    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  );
};
