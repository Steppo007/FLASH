import { Locator, expect, test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstance, kCalendarSB } from '../../storybook-components';
import { ComponentAction } from '../../componentActions';

const openCalendar = async (frameLoc: Locator) => {
  // clicking twice with some delay
  // somehow this is the only reliable solution to close and later re-open the calendear
  await frameLoc
    .locator('#storybook-root')
    .click({ position: { x: 20, y: 20 } });
  await new Promise((r) => setTimeout(r, 1000));
  await frameLoc
    .locator('#storybook-root')
    .click({ position: { x: 20, y: 20 } });

  await frameLoc.locator('.kro-kinput').click();
  await expect(frameLoc.locator('.kro-kcalendar')).toBeVisible();
};

const clickNextButton = async (frameLoc: Locator) => {
  await frameLoc.locator('[data-pc-section="nextbutton"]').click();
};

const clickYearButton = async (frameLoc: Locator) => {
  await frameLoc.locator('[data-pc-section="yeartitle"]').click();
};

const incrementHours = async (frameLoc: Locator) => {
  await frameLoc
    .locator('[data-pc-section="hourpicker"] [data-pc-section="incrementicon"]')
    .click();
};

const decrementHours = async (frameLoc: Locator) => {
  await frameLoc
    .locator('[data-pc-section="hourpicker"] [data-pc-section="decrementicon"]')
    .click();
};

const incrementMinutes = async (frameLoc: Locator) => {
  await frameLoc
    .locator(
      '[data-pc-section="minutepicker"] [data-pc-section="incrementicon"]'
    )
    .click();
};

const decrementMinutes = async (frameLoc: Locator) => {
  await frameLoc
    .locator(
      '[data-pc-section="minutepicker"] [data-pc-section="decrementicon"]'
    )
    .click();
};

test.describe('kcalendar', async () => {
  test('basic calendar renders correctly in both themes', async ({
    browser,
  }) => {
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await capture('no-action');
      await openCalendar(frameLoc);
      await capture('open');
      await frameLoc.getByText('19', { exact: true }).click();
      await capture('filled-input');
      await openCalendar(frameLoc);
      await capture('highlighted-day');
      await clickNextButton(frameLoc);
      await capture('next-month');
      await clickYearButton(frameLoc);
      await capture('choosing-year');
      await frameLoc.getByText('2027').click();
      await capture('choosing-month');
      await frameLoc.getByText('Nov').click();
      await capture('nov-2027');
    };

    await takeScreenshots(browser, kCalendarSB, {
      action,
      themes: bothThemes,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('small invalid input field with icon button renders correctly in both themes', async ({
    browser,
  }) => {
    const componentInstances: ComponentInstance[] = [
      { invalid: true, size: 'small', showIcon: true },
    ];
    await takeScreenshots(browser, kCalendarSB, {
      componentInstances,
      themes: bothThemes,
      captureWholePage: true,
    });
  });

  test('disabled input field does not respond to clicking', async ({
    browser,
  }) => {
    const componentInstances: ComponentInstance[] = [{ disabled: true }];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await frameLoc.locator('.kro-kinput').click({ force: true });
      await capture('click-disabled');
    };
    await takeScreenshots(browser, kCalendarSB, {
      action,
      componentInstances,
      captureWholePage: true,
    });
  });

  test('button bar behaves as expected, in both themes', async ({
    browser,
  }) => {
    const componentInstances: ComponentInstance[] = [{ showButtonBar: true }];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await openCalendar(frameLoc);
      await capture('open');
      await frameLoc.getByText('Today').click();
      const input = await frameLoc.locator('.kro-kinput').inputValue();
      expect(input).toHaveLength(10);
      await openCalendar(frameLoc);
      await frameLoc.getByText('Clear').click();
      await capture('date-cleared');
    };
    await takeScreenshots(browser, kCalendarSB, {
      action,
      componentInstances,
      themes: bothThemes,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('multiple date selection behaves as expected', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [
      { selectionMode: 'multiple' },
    ];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await openCalendar(frameLoc);
      await frameLoc.getByText('6', { exact: true }).click();
      await frameLoc.getByText('12', { exact: true }).click();
      await frameLoc.getByText('14', { exact: true }).click();
      await capture('select-multiple');
    };
    await takeScreenshots(browser, kCalendarSB, {
      action,
      componentInstances,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('date range selection behaves as expected', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [
      { selectionMode: 'range' },
    ];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await openCalendar(frameLoc);
      await frameLoc.getByText('6', { exact: true }).click();
      await frameLoc.getByText('12', { exact: true }).click();
      await capture('select-range');
    };
    await takeScreenshots(browser, kCalendarSB, {
      action,
      componentInstances,
      captureWholePage: true,
      fullScreen: true,
    });
  });

  test('time selection behaves as expected', async ({ browser }) => {
    const componentInstances: ComponentInstance[] = [{ showTime: true }];
    const action: ComponentAction = async (
      capture,
      page,
      compLoc,
      frameLoc
    ) => {
      await openCalendar(frameLoc);
      for (let i = 0; i < 6; i++) await incrementHours(frameLoc);
      await decrementHours(frameLoc);
      for (let i = 0; i < 5; i++) await incrementMinutes(frameLoc);
      await decrementMinutes(frameLoc);
      await capture('set-time');
      await page.keyboard.press('Escape');
      await capture('time-set');
    };
    await takeScreenshots(browser, kCalendarSB, {
      action,
      componentInstances,
      captureWholePage: true,
      fullScreen: true,
    });
  });
});
