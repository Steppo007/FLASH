import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { kInputGroupSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

test.describe('kinputgroup', async () => {
  test('small and large sizes render correctly', async ({ browser }) => {
    const componentInstances = [{ size: 'small' }, { size: 'large' }];
    await takeScreenshots(browser, kInputGroupSB, {
      componentInstances,
      captureWholePage: true,
    });
  });

  test('label, helper text, and tooltip render correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances = [
      {
        floatLabel: 'Label',
        helperText: 'Helper Text',
        tooltipLabel: 'Tooltip',
        invalid: false,
      },
      {
        floatLabel: 'Label',
        helperText: 'Helper Text',
        tooltipLabel: 'Tooltip',
        invalid: true,
      },
    ];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      if (frameLoc) {
        await frameLoc.locator('.kro-kinteractiveicon').hover();
        await capture('hover-tooltip');
      }
    };
    await takeScreenshots(browser, kInputGroupSB, {
      componentInstances,
      themes: bothThemes,
      action,
      captureWholePage: true,
    });
  });

  test('prepend and append render correctly', async ({ browser }) => {
    const componentInstances = [
      { prependText: '€', appendText: 'EUR', placeholder: 'Amount' },
      { prependText: 'Email', placeholder: 'your@email.com' },
      { appendText: '.com', placeholder: 'website' },
    ];
    await takeScreenshots(browser, kInputGroupSB, {
      componentInstances,
      captureWholePage: true,
    });
  });

  test('responds correctly to hover, click, and type', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.hover();
      await capture('hover');
      await compLoc.click();
      await capture('click');
      await page.keyboard.type('John Doe');
      await capture('type-john-doe');
    };
    await takeScreenshots(browser, kInputGroupSB, {
      action,
      captureWholePage: true,
    });
  });

  test('does not respond to typing when disabled', async ({ browser }) => {
    const action: ComponentAction = async (capture, page, compLoc) => {
      await compLoc.click({ force: true });
      await page.keyboard.type('John Doe');
      await capture('disabled');
    };
    const componentInstances = [{ disabled: true }];
    await takeScreenshots(browser, kInputGroupSB, {
      componentInstances,
      action,
      captureWholePage: true,
    });
  });
});
