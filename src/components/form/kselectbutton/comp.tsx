import { SelectButton } from 'primereact/selectbutton';
import { getKSelectButtonPTOptions, KSelectButtonProps } from '.';
import { SelectItem } from 'primereact/selectitem';
import { ReactNode } from 'react';

/**
 * Returns a KSelectButton component.
 */
export const KSelectButton = ({ ...props }: KSelectButtonProps) => {
  const itemTemplate = props.itemTemplate
    ? props.itemTemplate
    : (item: SelectItem) => (
        <span
          className="kro-kselectbutton-button-container"
          aria-label={item.label}
          data-pc-section="label"
        >
          {item.icon as ReactNode}
          <span>{item.label}</span>
        </span>
      );

  return (
    <SelectButton
      pt={getKSelectButtonPTOptions()}
      {...props}
      itemTemplate={itemTemplate}
      unstyled
    />
  );
};
