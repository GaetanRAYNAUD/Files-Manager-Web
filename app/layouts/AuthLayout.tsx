import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);

  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, {
    skip: profile !== undefined
  });

  useEffect(() => {
    if (profile === undefined && !isGetProfileLoading) {
      navigate('/');
    }
  }, [profile, navigate, isGetProfileLoading]);

  if (isGetProfileLoading) {
    return <AbsoluteLoader />;
  }

  return <Outlet />;
};

export default AuthLayout;
