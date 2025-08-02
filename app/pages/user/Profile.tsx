import { Container } from '@mui/material';
import React, { type FC, useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

const Home: FC = () => {
  const intl = useIntl();
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    document.title = intl.formatMessage({ id: 'common.title' }, { name: intl.formatMessage({ id: 'user.myProfile' }) });
  }, []);

  return (
    !profile ?
      <AbsoluteLoader/>
      :
      <Container maxWidth='sm'>
        <FormattedMessage id='user.profileOf' values={ { name: profile.name } }/>
      </Container>
  );
};

export default Home;
