import { test } from '@playwright/test';
import { bothThemes, takeScreenshots } from '../../storybook-screenshotter';
import {
  ComponentInstanceValue,
  kSeverityBadgeSB,
} from '../../storybook-components';
import { severityTypes } from '../../../src/components/misc/kseverityicon';
import { expandObjectWithArrayValues } from '../../utils/jsobjects';

test.describe('kseveritybadge', async () => {
  test('different severity types render correctly', async ({ browser }) => {
    const componentInstances =
      expandObjectWithArrayValues<ComponentInstanceValue>({
        severity: [...severityTypes],
      });
    await takeScreenshots(browser, kSeverityBadgeSB, {
      componentInstances,
      themes: bothThemes,
    });
  });
});
