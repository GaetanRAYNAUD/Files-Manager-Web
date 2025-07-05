import { Container } from '@mui/material';
import React, { type FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useLoginGoogleMutation } from '~/store/api/auth/auth.api';
import { OAUTH_STATE } from '~/utils/constants';

import type { Route } from '.react-router/types/app/pages/+types/Oidc';

const OAuth: FC<Route.ComponentProps> = ({ params }) => {
  const navigate = useNavigate();
  const { id } = params;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const localState = localStorage.getItem(OAUTH_STATE);
  const [status, setStatus] = useState<number>(0);
  const [loginGoogle, { isLoading: isLoginGoogleLoading, isSuccess: isGoogleSuccess }] = useLoginGoogleMutation();
  let pending = false;

  if (status === 0) {
    if (!localState || state !== localState) {
      console.log('Invalid authentication state.');
      setStatus(1);
    } else {
      setStatus(2);
    }
  }

  useEffect(() => {
    if (status === 1) {
      navigate({ pathname: '/', search: '?invalid=true' }, { replace: true });
    } else if (!pending && status === 2 && !isLoginGoogleLoading && code) {
      setStatus(3);
      pending = true;
      if ('google' === params.id.toLowerCase()) {
        loginGoogle({ token: code });
        localStorage.removeItem(OAUTH_STATE);
      }
    }
  }, [code, id, isLoginGoogleLoading, loginGoogle, navigate, status]);

  useEffect(() => {
    if (isGoogleSuccess) {
      navigate({ pathname: '/' }, { replace: true });
    }
  }, [isGoogleSuccess, navigate]);

  return (
    isLoginGoogleLoading ?
      <AbsoluteLoader /> :
      <Container maxWidth='sm'>
        { id }
      </Container>
  );
};

export default OAuth;
