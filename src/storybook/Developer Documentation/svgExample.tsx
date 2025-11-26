import { classNames } from 'primereact/utils';
import {
  getSVG,
  iconSvgs,
  otherSvgs,
  productSvgs,
} from '@sbook/svgComponents.autogen';
import { useState } from 'react';
import Check from '@root/assets/svgs/icons/check.svg?react';
import Clipboard from '@root/assets/svgs/icons/clipboard.svg?react';

export function IconGrid() {
  return <SvgGrid svgNames={iconSvgs} />;
}

export function ProductGrid() {
  return <SvgGrid svgNames={productSvgs} />;
}

export function OtherGrid() {
  return <SvgGrid svgNames={otherSvgs} />;
}

function SvgGrid(props: { svgNames: string[] }) {
  return (
    <div className="sb-unstyled bg-surface-default m-8 flex flex-wrap gap-x-8 gap-y-10 rounded-md p-10">
      {props.svgNames.map((label: string, index: number) => (
        <SvgCard key={index} label={label} />
      ))}
    </div>
  );
}

function SvgCard(props: { label: string }) {
  const [copyState, setCopyState] = useState<
    'none' | 'option-to-copy' | 'copied'
  >('none');
  const onMouseEnter = () => {
    if (copyState === 'none') {
      setCopyState('option-to-copy');
    }
  };
  const onMouseLeave = () => {
    setCopyState('none');
  };
  const copyNameToClipboard = () => {
    navigator.clipboard.writeText(props.label);
    setCopyState('copied');
  };

  const SvgComp = getSVG(props.label);

  return (
    <div className="flex w-32 flex-col gap-2">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={classNames(
          'relative flex h-32',
          'items-center justify-center rounded-lg',
          'bg-surface-accented text-content-bodytext'
        )}
      >
        <div
          className={classNames(
            'absolute top-2 left-2',
            'cursor-pointer rounded-md p-2',
            'text-content-interactive-subdued-default',
            'bg-surface-interactive-default',
            {
              hidden: copyState === 'none',
            }
          )}
          onClick={copyNameToClipboard}
        >
          {copyState === 'option-to-copy' && (
            <Clipboard width={20} height={20} />
          )}
          {copyState === 'copied' && <Check width={20} height={20} />}
        </div>
        {SvgComp && <SvgComp width={80} height={80} />}
      </div>

      <div className="text-content-default text-center break-words">
        {camelToTitle(props.label)}
      </div>
    </div>
  );
}

function camelToTitle(text: string) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
