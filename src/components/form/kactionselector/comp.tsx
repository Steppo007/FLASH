import { KActionSelectorProps } from './types';
import { classNames } from 'primereact/utils';
import { KLinkButton } from '../../button/klinkbutton';
import ExtendAll from '../../svg-workaround/ExtendAll';
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { KSelectList } from '../kselectlist';
import { getSelectorOverlayPtOptions } from './pt';
import { KText } from '../../misc/ktext';

export function KActionSelector(props: KActionSelectorProps) {
  const {
    options,
    className,
    noBoundaryStyling = false,
    value,
    onSelectValue,
    overlayHeader,
    overlayHint,
  } = props;
  const [visibleSelector, setVisibleSelector] = useState<boolean>(false);

  const showHeader = options.length >= 2;

  const hideSelector = () => setVisibleSelector(false);
  const showSelector = () => setVisibleSelector(true);

  const overlayHeaderComp = (
    <div className="header-text">
      <KText type="h3">{overlayHeader}</KText>
      <KText type="lead">{overlayHint}</KText>
    </div>
  );

  return (
    <div
      className={classNames(
        'kro-kactionselector',
        {
          'kro-kactionselector-boundary-styling': !noBoundaryStyling,
        },
        className
      )}
    >
      {showHeader && <Header {...props} onLinkClick={showSelector} />}

      <Content {...props} />

      <Sidebar
        visible={visibleSelector}
        position="bottom"
        onHide={hideSelector}
        pt={getSelectorOverlayPtOptions()}
        header={overlayHeaderComp}
        maskClassName="kro-kactionselector-mask"
        className="kro-kactionselector-sidebar"
      >
        <KSelectList
          options={options}
          value={value}
          onSelect={(v) => {
            onSelectValue(v);
            hideSelector();
          }}
        />
      </Sidebar>
    </div>
  );
}

function Content(
  props: {} & Pick<
    KActionSelectorProps,
    'buttonUrl' | 'buttonCommand' | 'buttonLabel' | 'buttonDisabled'
  >
) {
  const { buttonUrl, buttonCommand, buttonLabel, buttonDisabled } = props;
  return (
    <div className="kro-kactionselector-button-container">
      <a
        href={buttonUrl ?? '#'}
        className={classNames('kro-kactionselector-button', {
          'is-disabled': buttonDisabled,
        })}
        onClick={(e) => {
          e.preventDefault();
          buttonCommand?.(e);
        }}
      >
        <span>{buttonLabel}</span>
      </a>
    </div>
  );
}

function Header(
  props: {
    onLinkClick: () => void;
  } & Pick<KActionSelectorProps, 'label' | 'options' | 'value'>
) {
  const { label, options, value, onLinkClick } = props;

  const valueLabel =
    options.find((option) => option.value === value)?.label ??
    'Label not found';

  return (
    <div className="kro-kactionselector-header">
      <label className="label">{label}</label>
      <KLinkButton
        showArrow={false}
        label={valueLabel}
        iconEnd={<ExtendAll />}
        onClick={onLinkClick}
      />
    </div>
  );
}
