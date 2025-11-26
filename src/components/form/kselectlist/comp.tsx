import { useEffect, useRef } from 'react';
import KListItem from '../../data/klistitem';
import KText from '../../misc/ktext';
import { KCheckbox } from '../kcheckbox';
import { KRadioButton } from '../kradiobutton';
import {
  KBaseSelectListProps,
  KSelectListProps,
  KSelectListSelectionMode,
} from './types';
import { SelectItem } from 'primereact/selectitem';

export function KSelectList<TMode extends KSelectListSelectionMode = 'single'>({
  selectionMode,
  value,
  onSelect,
  ...props
}: KSelectListProps<TMode>) {
  return selectionMode === 'multiple' ? (
    <KSelectListMultiple
      {...props}
      value={value as string[]}
      onSelect={onSelect as (value: string[]) => void}
    />
  ) : (
    <KSelectListSingle
      {...props}
      value={value as string}
      onSelect={onSelect as (value: string) => void}
    />
  );
}

interface SelectListSingleProps extends KBaseSelectListProps {
  value: string;
  onSelect?: (value: string) => void;
}

function KSelectListSingle({
  header,
  options,
  value,
  onSelect,
}: SelectListSingleProps) {
  const headerAbsent = !header || header.trim() === '';
  return (
    <div className="kro-kselectlist">
      {!headerAbsent && (
        <div className="kro-select-list-header">
          <KText>{header}</KText>
        </div>
      )}
      <div className="kro-select-list-items">
        {options.map((option) => (
          <KListItem
            key={option.value}
            headline={option.label ?? option.value}
            trailingItem={<KRadioButton checked={option.value === value} />}
            onClick={() => onSelect?.(option.value)}
          />
        ))}
      </div>
    </div>
  );
}

interface SelectListMultipleProps extends KBaseSelectListProps {
  value: string[];
  onSelect?: (value: string[]) => void;
}

function KSelectListMultiple({
  header,
  options,
  value,
  onSelect,
}: SelectListMultipleProps) {
  const groupCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (groupCheckboxRef.current === null) return;
    groupCheckboxRef.current.indeterminate =
      value.length > 0 && value.length < options.length;
  }, [value]);

  const handleClickAll = () =>
    onSelect?.(
      value.length === options.length
        ? []
        : options.map((option) => option.value)
    );
  const handleClick = (option: SelectItem) =>
    onSelect?.(
      value.includes(option.value)
        ? value.filter((v) => v !== option.value)
        : [...value, option.value]
    );

  const headerAbsent = !header || header.trim() === '';

  return (
    <div className="kro-kselectlist">
      {!headerAbsent && (
        <button className="kro-select-list-header" onClick={handleClickAll}>
          <KText>{header}</KText>
          <KCheckbox
            checked={value?.length === options.length}
            inputRef={groupCheckboxRef}
          />
        </button>
      )}
      <div className="kro-select-list-items">
        {options.map((option) => (
          <KListItem
            key={option.value}
            headline={option.label ?? option.value}
            trailingItem={
              <KCheckbox checked={value?.includes(option.value) ?? false} />
            }
            onClick={() => handleClick?.(option)}
          />
        ))}
      </div>
    </div>
  );
}
