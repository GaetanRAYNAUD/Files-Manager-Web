import { Container } from '@mui/material';
import React, { type FC } from 'react';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const HomeCard: FC = () => {
  const profile = useAppSelector(selectProfile);
  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, { skip: profile !== undefined });

  return (
    isGetProfileLoading || !profile ?
      <AbsoluteLoader />
      :
      <Container maxWidth='sm'>
        Bonjour
        { ' ' }
        { profile.name }
      </Container>
  );
};
