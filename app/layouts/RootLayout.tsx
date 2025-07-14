import { styled } from '@mui/material';
import * as React from 'react';
import { Outlet } from 'react-router';
import { Header } from '~/components/header/Header';

const RootLayout: React.FC = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main = styled('div')(({ theme }) => (
  {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.custom.header.height,
    padding: theme.spacing(1)
  }
));

export default RootLayout;
