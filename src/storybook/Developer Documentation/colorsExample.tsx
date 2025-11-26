import { KText } from '@root/src/components/misc/ktext';
import { colors } from '@root/tailwind.colors.autogen';
import { classNames } from 'primereact/utils';

const tokenNames = Object.keys(colors);
const isPrimitiveColor = (tokenName: string) => tokenName.startsWith('colors');
const isComponentColor = (tokenName: string) =>
  tokenName.startsWith('button') ||
  tokenName.startsWith('formcontrol') ||
  tokenName.startsWith('input');
const comparator = (a: string, b: string) => {
  // assume a and b are strings such that, if they have a decimal digit (0-9),
  // then all characters after that are also decimal digits
  const regex = /([^\d]*)(\d*)/;
  const aMatch = a.match(regex) ?? [];
  const bMatch = b.match(regex) ?? [];
  const aWord = aMatch[1];
  const aNum = parseInt(aMatch[2]);
  const bWord = bMatch[1];
  const bNum = parseInt(bMatch[2]);
  if (aWord < bWord) return -1;
  else if (bWord < aWord) return 1;
  else return aNum - bNum;
};
const primitiveTokenNames = tokenNames
  .filter((x) => isPrimitiveColor(x))
  .sort(comparator);
const semanticTokenNames = tokenNames
  .filter((x) => !isPrimitiveColor(x) && !isComponentColor(x))
  .sort();

export function PrimitiveColors() {
  return <Colors tokenNames={primitiveTokenNames} />;
}

export function SemanticColors() {
  return <Colors tokenNames={semanticTokenNames} />;
}

function Colors({ tokenNames }: { tokenNames: string[] }) {
  return (
    <div className="sb-unstyled bg-surface-default m-8 columns-4 rounded-md p-10">
      {tokenNames.map((x) => (
        <Color key={x} name={x} />
      ))}
    </div>
  );
}

function Color({ name }: { name: string }) {
  return (
    <div className="flex h-20 w-52 break-inside-avoid-column items-center gap-3 p-4">
      <div
        className="border-content-bodytext h-10 max-w-12 min-w-12 border"
        style={{ backgroundColor: `var(--${name})` }}
      ></div>
      <KText className="break-words" type="text-xs">
        {name}
      </KText>
    </div>
  );
}

export function Demo() {
  return (
    <div className="sb-unstyled bg-surface-default m-8 flex items-center justify-center rounded-md p-10">
      <div
        className={classNames(
          'bg-surface-active text-content-bodytext',
          'border-border-primary-accented border-4',
          'flex h-40 w-40 items-center justify-center p-4'
        )}
      >
        <span className="text-center">SOME TEXT</span>
      </div>
    </div>
  );
}
