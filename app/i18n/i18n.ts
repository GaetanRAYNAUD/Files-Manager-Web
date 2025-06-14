import { en } from '~/i18n/en';
import { fr } from '~/i18n/fr';

export enum LOCALE {
  FR = 'fr',
  EN = 'en'
}

export const DEFAULT_LOCALE = LOCALE.EN;

export const getMessages = (lang: LOCALE): Record<string, string> => {
  switch (lang) {
    case LOCALE.FR:
      return fr;
    case LOCALE.EN:
      return en;
  }

  return getMessages(DEFAULT_LOCALE);
};

export const getLocale = (): LOCALE => {
  const browserLocale = navigator.languages[0];

  return Object.keys(LOCALE).includes(browserLocale) ? browserLocale as LOCALE : DEFAULT_LOCALE;
};