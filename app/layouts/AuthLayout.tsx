import type { FC, ReactNode } from 'react';
import * as React from 'react';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  // const auth = useAuth();
  // const location = useLocation();
  const doUserExists = useAppSelector(selectProfile);

  // const shouldFetchUser = auth.isAuthenticated && !doUserExists && !auth.isLoading;

  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, {
    // skip: !shouldFetchUser
  });

  /*  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      localStorage.setItem('postLoginRedirect', location.pathname + location.search);
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.isLoading]);*/

  if (/*auth.isLoading || */isGetProfileLoading || !doUserExists) {
    return <AbsoluteLoader />;
  }

  return children;
};
