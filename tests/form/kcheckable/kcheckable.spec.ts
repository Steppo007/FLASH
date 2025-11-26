import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  kCheckboxSB,
  kInputSwitchSB,
  kRadioButtonSB,
} from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

for (const { comp, sbObj } of [
  {
    comp: 'kcheckbox',
    sbObj: kCheckboxSB,
  },
  {
    comp: 'kradiobutton',
    sbObj: kRadioButtonSB,
  },
  {
    comp: 'kinputswitch',
    sbObj: kInputSwitchSB,
  },
]) {
  test.describe(comp, async () => {
    test('responds correctly to hovering and clicking in both themes, and when invalid', async ({
      browser,
    }) => {
      const componentInstances = [{ invalid: true }, { invalid: false }];
      const action: ComponentAction = async (
        capture,
        page,
        compLoc,
        frameLoc
      ) => {
        const checkableContainer = frameLoc.locator(
          '.kro-kcheckable-container'
        );
        await capture('no-action', checkableContainer);
        await checkableContainer.hover();
        await capture('hover', checkableContainer);
        await checkableContainer.click();
        await capture('click', checkableContainer);
      };
      await takeScreenshots(browser, sbObj, {
        componentInstances,
        action,
        themes: bothThemes,
      });
    });

    test(`disabled ${comp.substring(1)} does not respond, but info icon still does`, async ({
      browser,
    }) => {
      const componentInstances = [
        { disabled: true, infoIconText: 'Info Icon', size: 'small' },
      ];
      const action: ComponentAction = async (
        capture,
        page,
        compLoc,
        frameLoc
      ) => {
        const checkableContainer = frameLoc.locator(
          '.kro-kcheckable-container'
        );
        await checkableContainer.click({ force: true });
        await capture('click-disabled', checkableContainer);
        await checkableContainer.locator('.kro-kinteractiveicon').hover();
        await capture('tooltip-disabled', frameLoc);
      };
      await takeScreenshots(browser, sbObj, { componentInstances, action });
    });
  });
}
