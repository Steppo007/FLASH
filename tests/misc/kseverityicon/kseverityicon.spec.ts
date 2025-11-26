import { test } from '@playwright/test';
import { justDark, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kSeverityIconSB,
} from '../../storybook-components';
import { severityTypes } from '../../../src/components/misc/kseverityicon';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('kseverityicon', async () => {
  test('different severity types and sizes render correctly', async ({
    browser,
  }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severityTypes],
        size: ['small', 'default', 'large'],
      });
    await takeScreenshots(browser, kSeverityIconSB, { componentInstances });
  });
  test('dark mode renders correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severityTypes],
      });
    await takeScreenshots(browser, kSeverityIconSB, {
      componentInstances,
      themes: justDark,
    });
  });
});
