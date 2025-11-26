import { KButton } from '@root/src/components/button/kbutton';
import { ExampleWrapper } from '@root/src/storybook/utils';

export function BadgeExample() {
  /*
    badgeClassName: "kro-kbadge" AND
    "severity-(danger | warning | subdued)" AND
    "size-(xsmall | small | large)" AND 
    (optionally) "variant-outlined"
    */
  return (
    <ExampleWrapper className="flex justify-center">
      <KButton
        label="Krones"
        badge="3"
        badgeClassName="kro-kbadge severity-danger size-large"
      />
    </ExampleWrapper>
  );
}
