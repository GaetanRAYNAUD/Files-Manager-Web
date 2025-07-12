import { AppBar, Avatar, Grid, IconButton, styled, Tooltip } from '@mui/material';
import React, { type FC } from 'react';
import type { ProfileDto } from '~/store/api/user/user.type';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + (
      (
        hash << 5
      ) - hash
    );
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (
      hash >> (
        i * 8
      )
    ) & 0xff;
    color += `00${ value.toString(16) }`.slice(-2);
  }

  return color;
}

function profileToAvatar(profile: ProfileDto | undefined) {
  if (!profile?.name) {
    return '';
  }

  if (profile?.image) {
    return {
      src: profile?.image
    };
  }

  const children = profile.name.split(' ').map(n => n[0]).join('');

  return {
    sx: {
      bgcolor: stringToColor(profile.name)
    },
    children: `${ children }`
  };
}

export const Header: FC = () => {
  const profile = useAppSelector(selectProfile);

  return (
    <StyledAppBar elevation={ 0 }>
      <Wrapper container>
        <IconButton href='/' disableRipple>
          <LogoAvatar src='/logo.png' variant='square' />
        </IconButton>
        <SearchBar>
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…' inputProps={ { 'aria-label': 'search' } }
          />
        </SearchBar>
        <IconButton href='/profile' disableRipple>
          <Tooltip title={ profile?.name }>
            <ProfileAvatar { ...profileToAvatar(profile) } />
          </Tooltip>
        </IconButton>
      </Wrapper>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)(({ theme }) => (
  {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    position: 'fixed',
    height: theme.custom.header.height
  }
));

const Wrapper = styled(Grid)(({ theme }) => (
  {
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'space-between'
  }
));

const LogoAvatar = styled(Avatar)`
    height: 50px;
    width: 64px;
`;

const ProfileAvatar = styled(Avatar)`
    height: 50px;
    width: 50px;
`;

const SearchBar = styled('div')(({ theme }) => (
  {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  }
));