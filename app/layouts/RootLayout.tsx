import styled from '@emotion/styled';
import * as React from 'react';
import { Outlet } from 'react-router';

const RootLayout: React.FC = () => {
  return (
    <Container>
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
`;

export default RootLayout;
