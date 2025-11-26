import { addLocale, locale } from 'primereact/api';
import * as enGB from './prime-react-locale/en-GB.json';
import * as deDE from './prime-react-locale/de-DE.json';
import * as esES from './prime-react-locale/es-ES.json';

// if some labels are missing or there are errors about missing labels, check whether the structure is the same for en-GB.json and https://github.com/primefaces/primelocale/blob/main/en.json

const localizationMap = {
  // orders matter, en-GB should be the default
  'en-GB': enGB,
  'de-DE': deDE,
  'es-ES': esES,
};

const localeList = Object.keys(localizationMap);

export function addKronesComponentLocales() {
  for (const [key, value] of Object.entries(localizationMap)) {
    addLocale(key, value);
  }
}

export function getKronesComponentsLocaleBestMatch(localeInput: string) {
  return findBestLocaleMatch(localeList, localeInput);
}

export function setKronesComponentsLocale(localeInput: string) {
  locale(getKronesComponentsLocaleBestMatch(localeInput));
}

/**
 * @param availableLocales a list of locales configured per user
 * @param localeFromIAM the locale that we receive from IAM
 * @assumes availableLocales and userLocale are not empty
 * @returns a locale from the list which matches the one from IAM to some extent,
 * or undefined if no match can be found.
 */
export function findBestLocaleMatch(
  availableLocales: string[],
  userLocale: string
): string {
  for (const locale of availableLocales) {
    if (locale === userLocale) {
      return locale;
    }
  }

  const parsedUserLocale = parseLocaleSafe(userLocale);

  for (const locale of availableLocales) {
    const parsedLocale = parseLocaleSafe(locale);
    if (
      parsedUserLocale &&
      parsedLocale &&
      parsedUserLocale.language === parsedLocale.language
    ) {
      return locale;
    }
  }

  return availableLocales[0];
}

/**
 * Safe utility function for parsing a locale string into an Intl.Locale object
 */
export function parseLocaleSafe(localeString: string): Intl.Locale | null {
  try {
    const parsed = new Intl.Locale(localeString);
    if (!parsed.region) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
