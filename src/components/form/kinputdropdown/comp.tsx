import { Dropdown, DropdownPassThroughOptions } from 'primereact/dropdown';
import { KInputDropdownProps } from '.';
import { ObjectUtils, classNames } from 'primereact/utils';
import KFloatLabel from '../../misc/kfloatlabel';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { KHelperText } from '../../misc/khelpertext/comp';
import { KInputContainer } from '../kinputcontainer';
import { getKroClassNames } from '../../utils/kroClassNames';

export function getKInputDropdownPTOptions(
  props: KInputDropdownProps
): DropdownPassThroughOptions {
  const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;
  const { size = 'default', invalid, disabled } = props;
  return {
    root: {
      className: classNames(
        'kro-kinputdropdown kro-kinput',
        getKroClassNames({ size, invalid, disabled, filled })
      ),
    },
    panel: {
      className: classNames('kro-kinputdropdown-panel'),
      /* see https://github.com/primefaces/primereact/issues/6931 */
      onClick: (e) => {
        e.stopPropagation();
      },
    },
    wrapper: { style: { maxHeight: undefined } },
    item: { className: 'kro-knavitem-colors kro-outline-when-focused' },
  };
}

/**
 * Returns a KInputDropdown component.
 */
export const KInputDropdown = (props: KInputDropdownProps) => {
  const {
    size = 'default',
    className,
    helperText,
    inputId,
    floatLabel: label,
    ...dropdownProps
  } = props;
  const dropdownId = useIdOrFallback(inputId);

  return (
    <KInputContainer className={className}>
      <Dropdown
        pt={getKInputDropdownPTOptions({ size, ...dropdownProps })}
        focusOnHover={false}
        unstyled
        id={dropdownId}
        {...dropdownProps}
      />
      <KFloatLabel htmlFor={dropdownId}>{label}</KFloatLabel>
      <KHelperText htmlFor={dropdownId}>{helperText}</KHelperText>
    </KInputContainer>
  );
};
