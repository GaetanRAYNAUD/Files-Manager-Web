import React, { type FC } from 'react';
import { HomeCard } from '~/components/home/HomeCard';
import { LoginCard } from '~/components/login/LoginCard';
import { selectAuthExpires } from '~/store/auth/auth.selector';
import { useAppSelector } from '~/store/hooks';

const Home: FC = () => {
  const expires = useAppSelector(selectAuthExpires);

  return (
    expires ? <HomeCard /> : <LoginCard />
  );
};

export default Home;
