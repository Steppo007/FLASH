import {
  MultiSelect,
  MultiSelectPassThroughOptions,
} from 'primereact/multiselect';
import { KMultiSelectProps } from './types';
import { classNames, ObjectUtils } from 'primereact/utils';
import { KInputSize } from '../kinputtext';
import KHelperText from '../../misc/khelpertext';
import useIdOrFallback from '../../utils/useIdOrFallback';
import KFloatLabel from '../../misc/kfloatlabel';
import { KInputContainer } from '../kinputcontainer';
import {
  getKroClassNames,
  restrictToAllowedValues,
} from '../../utils/kroClassNames';
import { getKCheckboxPTOptions } from '../kcheckbox/pt';

export function getKMultiSelectPTOptions(
  props: KMultiSelectProps
): MultiSelectPassThroughOptions {
  const { size = 'default', disabled, invalid } = props;
  const checkboxSize = restrictToAllowedValues<KInputSize>(
    size,
    ['small', 'default'],
    'default'
  ) as 'small' | 'default';
  const filled = !ObjectUtils.isEmpty(props.value) || !!props.placeholder;

  return {
    root: {
      className: classNames(
        'kro-kmultiselect kro-kinput',
        getKroClassNames({ size, filled, disabled, invalid })
      ),
    },
    filterInput: {
      root: {
        className: classNames(
          'kro-kinputtext kro-kinput',
          getKroClassNames({ size: 'small', disabled, invalid, filled })
        ),
      },
    },
    checkbox: getKCheckboxPTOptions({ size: checkboxSize, disabled }),
    headerCheckbox: getKCheckboxPTOptions({ size: checkboxSize, disabled }),
    panel: {
      className: classNames('kro-kmultiselect-panel'),
    },
    item: {
      className: classNames('kro-knavitem', getKroClassNames({ size })),
    },
    label: {
      className: 'kro-kmultiselect-label',
    },
    trigger: {
      className: 'kro-kmultiselect-trigger',
    },
  };
}

export function KMultiSelect(props: KMultiSelectProps) {
  const {
    size,
    helperText,
    inputId,
    floatLabel: label,
    className,
    ...multiSelectProps
  } = props;
  const multiSelectId = useIdOrFallback(inputId);

  return (
    <KInputContainer className={className}>
      <MultiSelect
        id={multiSelectId}
        pt={getKMultiSelectPTOptions({ size, ...multiSelectProps })}
        {...multiSelectProps}
      />
      {label && <KFloatLabel htmlFor={multiSelectId}>{label}</KFloatLabel>}
      {helperText && (
        <KHelperText htmlFor={multiSelectId}>{helperText}</KHelperText>
      )}
    </KInputContainer>
  );
}
