import KIconButton from '@root/src/components/button/kiconbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';

// this imports works with vite and vite-plugin-svgr
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';

export function Example() {
  /*
  badgeClassName: "kro-kbadge" AND
  "severity-(danger | warning | subdued)" AND
  "size-(xsmall | small | large)" AND 
  (optionally) "variant-outlined"
  */
  return (
    <ExampleWrapper className="flex justify-center">
      <KIconButton
        icon={<LanguageGlobe />}
        tooltip="Tooltip text"
        tooltipOptions={{ position: 'top', showDelay: 1000 }}
        badge="3"
        badgeClassName="kro-kbadge severity-danger size-large"
      />
    </ExampleWrapper>
  );
}
