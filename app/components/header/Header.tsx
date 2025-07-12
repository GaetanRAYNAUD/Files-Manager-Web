import { Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Avatar, Box, Grid, IconButton, InputBase, styled, Tooltip } from '@mui/material';
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
        {
          profile &&
          (
            <>
              <SearchWrapper>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder='Rechercher…' inputProps={ { 'aria-label': 'search' } }
                  />
                </Search>
              </SearchWrapper>
              <IconButton href='/profile' disableRipple>
                <Tooltip title={ profile?.name }>
                  <ProfileAvatar { ...profileToAvatar(profile) } />
                </Tooltip>
              </IconButton>
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

const ProfileAvatar = styled(Avatar)`
    height: 50px;
    width: 50px;
`;

const SearchWrapper = styled(Box)`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = styled('div')(({ theme }) => (
  {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.custom.background.secondary.default,
    '&:hover': {
      backgroundColor: theme.custom.background.secondary.hover
    },
    margin: theme.spacing(0, 2),
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  }
));

const SearchIconWrapper = styled('div')(({ theme }) => (
  {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
));

const StyledInputBase = styled(InputBase)(({ theme }) => (
  {
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${ theme.spacing(4) })`,
      transition: theme.transitions.create('width')
    }
  }
));