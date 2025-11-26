import { KDialogPage, KMultiPageDialogProps } from '.';
import { useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { KSideMenu } from '../../menu/ksidemenu';
import { KDialog } from '../kdialog';
import { classNames } from 'primereact/utils';

/**
 * Returns the KModal component. This uses the PrimeReact Dialog component, and includes a side menu which allows navigation between content pages.
 * This takes all the same attributes as the PrimeReact Dialog component, and additionally, a "model" which controls the side menu and content pages.
 */
export function KMultiPageDialog({
  model,
  activePageId,
  onPageChange,
  ...props
}: KMultiPageDialogProps) {
  const [activeIdState, setActiveIdState] = useState<string>(
    activePageId ?? model[0].id
  );
  const activeId = onPageChange ? activePageId : activeIdState;

  const setActivePage = onPageChange ?? setActiveIdState;

  const activeIndex = model.findIndex((x) => x.id === activeId);
  const tabMenuModel: MenuItem[] = model.map((x: KDialogPage) => {
    return { icon: x.icon, label: x.label, id: x.id };
  });
  return (
    <KDialog
      {...props}
      className={classNames(props.className, 'kro-kmultipagedialog')}
    >
      <KSideMenu
        activeIndex={activeIndex}
        model={tabMenuModel}
        onTabChange={(e) => {
          setActivePage(model[e.index].id);
        }}
      />
      <div className="kro-kmultipagedialog-page">
        {model[activeIndex].content}
      </div>
    </KDialog>
  );
}
