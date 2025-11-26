import { KInputSearchProps } from './types';
import { ObjectUtils, classNames } from 'primereact/utils';
import KFloatLabel from '../../misc/kfloatlabel';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { KHelperText } from '../../misc/khelpertext/comp';
import { KInputContainer } from '../kinputcontainer';
import { getKroClassNames } from '../../utils/kroClassNames';
import {
  AutoComplete,
  AutoCompletePassThroughOptions,
} from 'primereact/autocomplete';
import {
  KInteractiveIcon,
  KInteractiveIconProps,
} from '../../misc/kinteractiveicon';

function getKInputSearchPTOptions(
  props: KInputSearchProps
): AutoCompletePassThroughOptions {
  const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;
  const { size = 'default', invalid, disabled } = props;
  return {
    root: {
      className: 'kro-kinputsearch',
    },
    input: {
      root: {
        className: classNames(
          'kro-kinput',
          getKroClassNames({ size, invalid, disabled, filled })
        ),
      },
    },
    loadingIcon: {
      className: 'kro-kinputsearch-loader',
    },
    panel: {
      className: 'kro-kinputsearch-panel',
      /* see https://github.com/primefaces/primereact/issues/6931 */
      onClick: (e) => {
        e.stopPropagation();
      },
    },
    item: { className: 'kro-knavitem-colors kro-outline-when-focused' },
  };
}

/**
 * Returns a KInputSearch component.
 */
export const KInputSearch = (props: KInputSearchProps) => {
  const SearchIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5033 9.50326H9.97659L9.78992 9.32326C10.4433 8.56326 10.8366 7.57659 10.8366 6.50326C10.8366 4.10992 8.89659 2.16992 6.50326 2.16992C4.10992 2.16992 2.16992 4.10992 2.16992 6.50326C2.16992 8.89659 4.10992 10.8366 6.50326 10.8366C7.57659 10.8366 8.56326 10.4433 9.32326 9.78992L9.50326 9.97659V10.5033L12.8366 13.8299L13.8299 12.8366L10.5033 9.50326ZM6.50326 9.50326C4.84326 9.50326 3.50326 8.16326 3.50326 6.50326C3.50326 4.84326 4.84326 3.50326 6.50326 3.50326C8.16326 3.50326 9.50326 4.84326 9.50326 6.50326C9.50326 8.16326 8.16326 9.50326 6.50326 9.50326Z"
        fill="currentColor"
      />
    </svg>
  );
  const ClearIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6668 4.27325L11.7268 3.33325L8.00016 7.05992L4.2735 3.33325L3.3335 4.27325L7.06016 7.99992L3.3335 11.7266L4.2735 12.6666L8.00016 8.93992L11.7268 12.6666L12.6668 11.7266L8.94016 7.99992L12.6668 4.27325Z"
        fill="currentColor"
      />
    </svg>
  );
  const {
    size = 'default',
    className,
    helperText,
    inputId,
    floatLabel: label,
    ...inputSearchProps
  } = props;
  const inputSearchId = useIdOrFallback(inputId);

  const handleClear = () => {
    props.onChange?.({
      originalEvent: new Event('change') as unknown as React.SyntheticEvent,
      value: '',
      stopPropagation: () => {},
      preventDefault: () => {},
      target: { name: '', id: '', value: '' },
    });
  };

  const clearInteractiveIconProps: KInteractiveIconProps = {
    icon: <ClearIcon />,
    onClick: handleClear,
    size: size,
    className: classNames('kro-kclearicon', getKroClassNames({ size })),
  };
  const searchInteractiveIconProps: KInteractiveIconProps = {
    icon: <SearchIcon />,
    size: size,
    className: classNames('kro-ksearchicon', getKroClassNames({ size })),
    disabled: true,
  };
  return (
    <KInputContainer className={className}>
      <AutoComplete
        pt={getKInputSearchPTOptions({ size, ...inputSearchProps })}
        id={inputSearchId}
        unstyled
        {...inputSearchProps}
      ></AutoComplete>
      <KFloatLabel
        className="kro-kfloatlabel-ksearchinputdropdown"
        htmlFor={inputSearchId}
      >
        {label}
      </KFloatLabel>
      <KHelperText htmlFor={inputSearchId}>{helperText}</KHelperText>
      {props.value && <KInteractiveIcon {...clearInteractiveIconProps} />}
      <KInteractiveIcon {...searchInteractiveIconProps} />
    </KInputContainer>
  );
};
