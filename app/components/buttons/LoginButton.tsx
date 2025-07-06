import { Button } from '@mui/material';
import React, { type FC, type ReactNode } from 'react';
import type { SupportedProvider } from '~/auth/auth.types';

type Props = {
  label: string;
  icon: ReactNode;
  provider: SupportedProvider;
};

export const LoginButton: FC<Props> = ({ icon, label, provider }) => {
  return (
    <Button
      href={ `http://localhost:8080/oauth2/authorization/${ provider }?final_redirect_uri=${ encodeURIComponent(`${ window.location.origin }/authenticated/${ provider }`) }` }
      startIcon={ icon }
      variant='contained'
      color='primary'
      fullWidth
    >
      { label }
    </Button>
  );
};
