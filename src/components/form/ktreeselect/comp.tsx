import {
  TreeSelect,
  TreeSelectPassThroughOptions,
} from 'primereact/treeselect';
import { KTreeSelectProps } from '.';
import { classNames, ObjectUtils } from 'primereact/utils';
import { KInputContainer } from '../kinputcontainer';
import KHelperText from '../../misc/khelpertext';
import KFloatLabel from '../../misc/kfloatlabel';
import useIdOrFallback from '../../utils/useIdOrFallback';
import { getKroClassNames } from '../../utils/kroClassNames';

export function getKTreeSelectPTOptions(
  props: KTreeSelectProps
): TreeSelectPassThroughOptions {
  const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;
  const { size = 'default', invalid, disabled } = props;
  return {
    root: {
      className: classNames(
        'kro-kinputdropdown kro-ktreeselect kro-kinput',
        getKroClassNames({ size, invalid, disabled, filled })
      ),
    },
    panel: {
      className: classNames('kro-kinputdropdown-panel kro-ktreeselect-panel'),
      /* see https://github.com/primefaces/primereact/issues/6931 */
      onClick: (e) => {
        e.stopPropagation();
      },
    },
    wrapper: { style: { maxHeight: undefined } },
  };
}

export function KTreeSelect(props: KTreeSelectProps) {
  const {
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    size,
    helperText,
    inputId,
    floatLabel: label,
    options,
    ...restProps
  } = props;

  const ptOptions = getKTreeSelectPTOptions(props);
  const treeSelectId = useIdOrFallback(inputId);

  return (
    <KInputContainer className={className}>
      <TreeSelect
        id={treeSelectId}
        pt={ptOptions}
        options={options}
        {...restProps}
      />
      <KFloatLabel htmlFor={treeSelectId}>{label}</KFloatLabel>
      <KHelperText htmlFor={treeSelectId}>{helperText}</KHelperText>
    </KInputContainer>
  );
}
