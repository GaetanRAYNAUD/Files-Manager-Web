import { AccountCircle, Logout } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  type MenuProps,
  styled,
  Tooltip
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { type FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router';
import { useLogoutMutation } from '~/store/api/auth/auth.api';
import type { ProfileDto } from '~/store/api/user/user.type';

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

interface Props {
  profile: ProfileDto;
}

export const HeaderUserMenu: FC<Props> = ({ profile }) => {
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await logout().unwrap();
      navigate('/');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <>
      <IconButton onClick={ handleClick } disableRipple>
        <Tooltip title={ profile?.name }>
          <ProfileAvatar { ...profileToAvatar(profile) } />
        </Tooltip>
      </IconButton>
      <StyledMenu
        anchorEl={ anchorEl }
        open={ open }
        onClose={ handleClose }
        onClick={ handleClose }
      >
        <MenuItem component={ Link } to='/profile'>
          <ListItemIcon>
            <AccountCircle fontSize='small'/>
          </ListItemIcon>
          <FormattedMessage id='user.myProfile' />
        </MenuItem>
        <Divider/>
        <MenuItem onClick={ handleLogout } disabled={ isLoggingOut }>
          <ListItemIcon>
            { isLoggingOut ? (
              <CircularProgress size={ 20 }/>
            ) : (
              <Logout fontSize='small'/>
            ) }
          </ListItemIcon>
          <FormattedMessage id='user.logout' />
        </MenuItem>
      </StyledMenu>
    </>
  );
};

const ProfileAvatar = styled(Avatar)`
    height: 48px;
    width: 48px;
`;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={ {
      vertical: 'bottom',
      horizontal: 'right'
    } }
    transformOrigin={ {
      vertical: 'top',
      horizontal: 'right'
    } }
    { ...props }
  />
))(({ theme }) => ({
  '& .MuiMenu-paper': {
    boxShadow: theme.shadows[2],
    marginTop: theme.spacing(1),
    overflow: 'visible',
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      marginLeft: -0.5,
      marginRight: 1
    }
  }
}));