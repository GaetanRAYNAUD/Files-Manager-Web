import { AppBar, Avatar, Grid, IconButton, styled } from '@mui/material';
import React, { type FC } from 'react';
import { HeaderSearchbar } from '~/components/header/HeaderSearchBar';
import { HeaderUserMenu } from '~/components/header/HeaderUserMenu';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const Header: FC = () => {
  const profile = useAppSelector(selectProfile);

  return (
    <StyledAppBar elevation={ 0 }>
      <Wrapper container>
        <IconButton href='/' disableRipple>
          <LogoAvatar src='/logo.png' variant='square'/>
        </IconButton>
        {
          profile &&
          (
            <>
              <HeaderSearchbar/>
              <HeaderUserMenu profile={ profile }/>
            </>
          )
        }
      </Wrapper>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => (
  {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    height: theme.custom.header.height
  }
));

const Wrapper = styled(Grid)`
    flex-grow: 1;
    align-content: center;
    justify-content: space-between;
    flex-wrap: nowrap;
`;

const LogoAvatar = styled(Avatar)`
    height: 50px;
    width: 64px;
`;