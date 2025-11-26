import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import { ComponentInstanceValue, kToastSB } from '../../storybook-components';
import { severityTypes } from '../../../src/components/message/ktoast';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';
import { ComponentAction } from '../../componentActions';

const action: ComponentAction = async (capture, _page, compLoc, frameLoc) => {
  await frameLoc.getByText('Show Message').click();
  await capture('click');
};

test.describe('ktoast', async () => {
  test('different severity types render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severityTypes],
      });
    await takeScreenshots(browser, kToastSB, {
      componentInstances,
      action,
      fullScreen: true,
    });
  });
  test('dark mode renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severityTypes],
      });
    await takeScreenshots(browser, kToastSB, {
      componentInstances,
      themes: justDark,
      action,
      fullScreen: true,
    });
  });
});
