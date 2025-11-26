import test, { expect } from '@playwright/test';
import {
  findBestLocaleMatch,
  parseLocaleSafe,
} from '../../src/components/utils/localization';

test.describe(parseLocaleSafe.name, () => {
  const testCases = [
    { localeString: 'en-GB', expected: new Intl.Locale('en-GB') },
    { localeString: 'de-DE', expected: new Intl.Locale('de-DE') },
    { localeString: 'en', expected: null },
    { localeString: 'en-gb', expected: new Intl.Locale('en-GB') },
    { localeString: 'en-gB', expected: new Intl.Locale('en-GB') },
    { localeString: '22ef', expected: null },
    { localeString: 'en_GB', expected: null },
  ];

  for (const { localeString, expected } of testCases) {
    test(`${localeString} parses as ${expected?.baseName || 'null'}`, () => {
      const parsed = parseLocaleSafe(localeString);
      expect(!!parsed).toBe(!!expected);
      if (parsed && expected) {
        expect(parsed.baseName).toBe(expected.baseName);
      }
    });
  }
});

test.describe(findBestLocaleMatch.name, () => {
  const testCases = [
    { availableLocales: ['en-GB'], localeData: 'en-GB', locale: 'en-GB' },
    { availableLocales: ['en-GB'], localeData: '', locale: 'en-GB' },
    {
      availableLocales: ['es-ES', 'es-UY', 'de-DE'],
      localeData: 'es-UY',
      locale: 'es-UY',
    },
    // first matching locale is used, can be based on language code only
    {
      availableLocales: ['es-ES', 'en-GB', 'de-DE'],
      localeData: 'es-UY',
      locale: 'es-ES',
    },
    {
      availableLocales: ['de-DE', 'illegallanguage', 'en-GB', 'es-ES'],
      localeData: 'es-ES',
      locale: 'es-ES',
    },
    {
      availableLocales: ['es-ES', 'de-DE'],
      localeData: 'en-GB',
      locale: 'es-ES',
    },
  ];

  for (const { availableLocales, localeData, locale } of testCases) {
    test(`[${availableLocales}] and ${localeData} yields ${locale}`, () => {
      const bestMatch = findBestLocaleMatch(availableLocales, locale);
      expect(bestMatch).toBe(locale);
    });
  }
});
