import { KTile, KTileView } from '@complib/misc/ktile';
import { KRadioButton } from '@root/src/components/form/kradiobutton';
import { ExampleWrapper } from '@sbook/utils';
import { getSVG, productSvgs } from '@sbook/svgComponents.autogen';
import { useState } from 'react';

/**
 * Demonstrates the usage of the KTile. Returns a component containing a grid of KTiles
 * with product logos and names, to be included in the main documentation page.
 */
export default function Demo() {
  const [view, setView] = useState<KTileView>('tile');
  return (
    <ExampleWrapper>
      <div className="mb-10 flex items-center justify-center gap-5">
        <KRadioButton
          label="Tile View"
          checked={view === 'tile'}
          value="tile"
          onChange={(e) => setView(e.target.value as KTileView)}
        />
        <KRadioButton
          label="List View"
          checked={view === 'list'}
          value="list"
          onChange={(e) => setView(e.target.value as KTileView)}
        />
      </div>
      <div className="flex flex-wrap gap-8">
        {productSvgs.map((productName) => {
          const Svg = getSVG(productName);
          return (
            <KTile
              key={productName}
              view={view}
              label={camelToTitle(productName)}
            >
              {Svg && <Svg />}
            </KTile>
          );
        })}
      </div>
    </ExampleWrapper>
  );
}

function camelToTitle(text: string) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}
