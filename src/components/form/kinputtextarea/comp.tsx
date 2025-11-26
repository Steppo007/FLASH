import { KInputTextareaProps } from '.';
import { classNames, ObjectUtils } from 'primereact/utils';
import { getKroClassNames } from '../../utils/kroClassNames';
import { KInputContainer } from '../kinputcontainer';
import KFloatLabel from '../../misc/kfloatlabel';
import KHelperText from '../../misc/khelpertext';
import useIdOrFallback from '../../utils/useIdOrFallback';

export function KInputTextarea(props: KInputTextareaProps) {
  const {
    id,
    invalid,
    disabled,
    placeholder,
    floatLabel,
    helperText,
    className,
    ...restProps
  } = props;
  const filled = ObjectUtils.isNotEmpty(props.value) || !!props.placeholder;

  const inputId = useIdOrFallback(id);

  const cn = classNames(
    'kro-kinputtextarea kro-kinput kro-size-default',
    getKroClassNames({ disabled, invalid, filled })
  );

  return (
    <KInputContainer className={className}>
      <textarea
        id={inputId}
        className={cn}
        placeholder={placeholder}
        disabled={disabled}
        {...restProps}
      />
      <KFloatLabel htmlFor={inputId}>{floatLabel}</KFloatLabel>
      <KHelperText htmlFor={inputId}>{helperText}</KHelperText>
    </KInputContainer>
  );
}
