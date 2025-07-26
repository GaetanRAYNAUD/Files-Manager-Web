import { Card, CardContent, CardHeader, Container, Grid } from '@mui/material';
import React, { type FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { oidcConfigs, SupportedProvider } from '~/auth/auth.types';
import { LoginButton } from '~/components/buttons/LoginButton';

export const LoginCard: FC = () => {
  return (
    <Container maxWidth='sm'>
      <Card>
        <CardHeader title={ <FormattedMessage id='home.login'/> }/>
        <CardContent>
          <Grid container spacing={ 1 }>
            {
              Object.entries(oidcConfigs).map(([provider, config]) => {
                const IconComponent = config.icon;

                return (
                  <Grid key={ `login-button-${ provider }` } size={ 6 }>
                    <LoginButton provider={ provider as SupportedProvider } icon={ <IconComponent/> }
                      label={ config.label }
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
