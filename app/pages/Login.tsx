import { Button, Card, CardContent, CardHeader, Container, Grid } from '@mui/material';
import React, { type FC } from 'react';
import { useLocation } from 'react-router';
import { AmazonLogo } from '~/assets/logo/amazon';
import { DiscordLogo } from '~/assets/logo/discord';
import { GithubLogo } from '~/assets/logo/github';
import { GoogleLogo } from '~/assets/logo/google';
import { TwitchLogo } from '~/assets/logo/twitch';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { LoginButton } from '~/components/buttons/LoginButton';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

const Login: FC = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const invalid = searchParams.get('invalid'); //Todo display a message

  const googleOptions = {
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirect_uri: 'http://localhost:3000/oidc/google',
    client_id: '274785715882-9n1uc5jjvparsbfua1aqj5eb6ls21mrg.apps.googleusercontent.com',
    scope: 'openid'
  };

  const profile = useAppSelector(selectProfile);
  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, { skip: profile !== undefined });

  return (
    isGetProfileLoading ? <AbsoluteLoader />
      :
      profile ?
        <Container maxWidth='sm'>
          { profile.name }
          <Button href='/oidc/google' variant='contained'>
            Button
          </Button>
        </Container>
        :
        <Container maxWidth='sm'>
          <Card>
            <CardHeader title='Login' />
            <CardContent>
              <Grid container spacing={ 1 }>
                <Grid size={ 6 }>
                  <LoginButton options={ googleOptions } icon={ <DiscordLogo /> } label='Discord' />
                </Grid>
                <Grid size={ 6 }>
                  <LoginButton options={ googleOptions } icon={ <GoogleLogo /> } label='Google' />
                </Grid>
                <Grid size={ 6 }>
                  <LoginButton options={ googleOptions } icon={ <TwitchLogo /> } label='Twitch' />
                </Grid>
                <Grid size={ 6 }>
                  <LoginButton options={ googleOptions } icon={ <AmazonLogo /> } label='Amazon' />
                </Grid>
                <Grid size={ 6 }>
                  <LoginButton options={ googleOptions } icon={ <GithubLogo /> } label='Github' />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
  );
};

export default Login;
