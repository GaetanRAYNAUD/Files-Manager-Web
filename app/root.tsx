import { ThemeProvider } from '@mui/material';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import { DEFAULT_LOCALE, getLocale, getMessages } from '~/i18n/i18n';
import { store } from '~/store/store';

import { theme } from './theme';

export default function App() {
  const locale = getLocale();
  return (
    <Provider store={ store }>
      <IntlProvider locale={ locale } messages={ getMessages(locale) } defaultLocale={ DEFAULT_LOCALE }>
        <ThemeProvider theme={ theme }>
          <Outlet />
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}
