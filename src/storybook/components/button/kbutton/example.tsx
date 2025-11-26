import { KButton } from '@root/src/components/button/kbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';

// this imports works with vite and vite-plugin-svgr
import LanguageGlobe from '@root/assets/svgs/icons/languageGlobe.svg?react';

export function Example() {
  return (
    <ExampleWrapper className="flex justify-center">
      <KButton label="Krones" icon={<LanguageGlobe />} />
    </ExampleWrapper>
  );
}
