import { classNames } from 'primereact/utils';
import {
  getSVG,
  iconSvgs,
  otherSvgs,
  productSvgs,
} from './svgComponents.autogen';
import { ReactDivProps } from '../components/utils/reactProps';
import { CSSProperties } from 'react';

export function ExampleWrapper(props: ReactDivProps) {
  return (
    <div
      className={classNames(
        'sb-unstyled bg-surface-page m-8 rounded-md p-10 in-[.sb-main-fullscreen]:m-0',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export const svgStorybookMapObject: Record<string, React.ReactNode> = {};
const allKeys = [...iconSvgs, ...productSvgs, ...otherSvgs, 'none'];
allKeys.forEach((name) => {
  const Svg = getSVG(name);
  svgStorybookMapObject[name] = Svg ? <Svg /> : undefined;
});

/**
 * Given a list [x_1, x_2, ..., x_n] will return an object
 * {
 *  indexMap(1): [x_1],
 *  indexMap(2): [x_1, x_2],
 *  ...
 *  indexMap(n): [x_1, x_2, ..., x_n]
 * }
 */
export function getSliceMapping<T>(list: T[], indexMap: (i: number) => string) {
  const indices = Object.keys(list).map((x) => parseInt(x) + 1);
  return Object.fromEntries(
    indices.map((i) => {
      return [indexMap(i), list.slice(0, i)];
    })
  );
}

export function Table(props: {
  headers: string[];
  rows: string[][];
  styles?: CSSProperties;
}) {
  return (
    <table style={props.styles}>
      <thead>
        <tr>
          {props.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ColorPalette() {
  const gridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 'var(--space-2_5)',
    padding: 'var(--space-5)',
  };
  const columnStyles: CSSProperties = {
    padding: 'var(--space-2_5)',
    borderRadius: 'var(--size-2)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  const colorStyles: CSSProperties = {
    padding: 'var(--size-3_5)',
    textAlign: 'center',
    borderRadius: 'var(--size-1)',
  };
  const colorSuffixes = [
    50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ];

  return (
    <div style={gridStyles}>
      {palette.map((column) => (
        <div key={column.title} style={columnStyles}>
          <h3>{column.title}</h3>
          {colorSuffixes.slice(0, column.max ?? 11).map((suffix) => (
            <div
              key={column.title + suffix}
              style={{
                ...colorStyles,
                backgroundColor: `var(--colors-${column.colorPrefix.toLowerCase()}-${suffix})`,
                color: suffix > 400 ? 'white' : 'black',
              }}
            >
              {column.colorPrefix}-{suffix}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const palette = [
  {
    title: 'Brand Blue',
    colorPrefix: 'Blue',
  },
  {
    title: 'Neutral Grey',
    colorPrefix: 'Neutral',
    max: 12,
  },
  {
    title: 'Solid Grey',
    colorPrefix: 'Grey',
  },
  {
    title: 'Critical',
    colorPrefix: 'Critical',
  },
  {
    title: 'Warning',
    colorPrefix: 'Warning',
  },
  {
    title: 'Success',
    colorPrefix: 'Success',
  },
  {
    title: 'Accent',
    colorPrefix: 'Accent',
  },
];

export const badgeStyles: CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  color: 'black',
  paddingInline: 'var(--space-1)',
  borderRadius: 'var(--size-0_75)',
};

export const badgeStylesSpacing: CSSProperties = {
  fontSize: '14px',
  fontWeight: '500',
  color: 'black',
  paddingInline: 'var(--space-1)',
  borderRadius: 'var(--size-0_75)',
  fontFamily: 'monospace',
  backgroundColor: '#dddee1',
};
