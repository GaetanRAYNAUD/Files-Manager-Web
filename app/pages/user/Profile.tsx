import { Container } from '@mui/material';
import React, { type FC } from 'react';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

const Home: FC = () => {
  const profile = useAppSelector(selectProfile);

  return (
    !profile ?
      <AbsoluteLoader />
      :
      <Container maxWidth='sm'>
        Profil de
        { ' ' }
        { profile.name }
      </Container>
  );
};

export default Home;
