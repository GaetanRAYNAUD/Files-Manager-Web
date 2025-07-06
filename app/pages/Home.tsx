import React, { type FC } from 'react';
import { HomeCard } from '~/components/home/HomeCard';
import { LoginCard } from '~/components/login/LoginCard';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

const Home: FC = () => {
  const profile = useAppSelector(selectProfile);

  return (
    profile ? <HomeCard /> : <LoginCard />
  );
};

export default Home;
