import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { selectAuthExpires } from '~/store/auth/auth.selector';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const AuthLayout = () => {
  const navigate = useNavigate();
  const expires = useAppSelector(selectAuthExpires);
  const profile = useAppSelector(selectProfile);

  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, {
    skip: profile !== undefined || expires === undefined
  });

  if (isGetProfileLoading) {
    return <AbsoluteLoader />;
  }

  if (!expires) {
    navigate('/');
    return;
  }

  return <Outlet />;
};

export default AuthLayout;
