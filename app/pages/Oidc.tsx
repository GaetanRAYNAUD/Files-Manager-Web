import React, { type FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SupportedProvider } from '~/auth/auth.types';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useLoginMutation } from '~/store/api/auth/auth.api';

import type { Route } from './+types/Oidc';

const Oidc: FC<Route.ComponentProps> = ({ params }) => {
  const navigate = useNavigate();
  const { id } = params;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  const [login, { isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (code && id) {
      login({ token: code, provider: id as SupportedProvider });
    }
  }, [code, id, login]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <AbsoluteLoader />
  );
};

export default Oidc;
