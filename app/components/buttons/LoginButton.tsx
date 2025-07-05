import { Button } from '@mui/material';
import React, { type FC, useState } from 'react';
import { OAUTH_STATE } from '~/utils/constants';
import { generateRandomString } from '~/utils/string.utils';

type Props = {
  label: string;
  icon: React.ReactNode;
  options: { url: string, redirect_uri: string, client_id: string, scope: string };
};

export const LoginButton: FC<Props> = ({ icon, label, options }) => {
  const { url, redirect_uri, client_id, scope } = options;
  const [href, setHref] = useState<string | undefined>(url);

  const handleClick = () => {
    const state = generateRandomString();
    localStorage.setItem(OAUTH_STATE, state);

    const qs = new URLSearchParams({ redirect_uri, client_id, response_type: 'code', scope, state });
    setHref(`${ url }?${ qs.toString() }`);
  };

  return (
    <Button onClick={handleClick} href={ href } startIcon={ icon } variant='contained' color='primary' fullWidth>
      { label }
    </Button>
  );
};
