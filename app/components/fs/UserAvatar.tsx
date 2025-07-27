import React, { type FC } from 'react';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';
import type { UserDto } from "~/store/api/user/user.type";
import { FormattedMessage } from "react-intl";
import { Avatar, Grid, styled } from "@mui/material";

interface Props {
  user: UserDto;
}

export const UserAvatar: FC<Props> = ({ user }) => {
  const profile = useAppSelector(selectProfile);
  const isMe = user.id === profile?.id;

  return (
    <Container container spacing={ 1 }>
      {
        user.image && <OwnerAvatar src={ user.image }/>
      }
      { isMe ? (
        <FormattedMessage id={ 'user.me' }/>
      ) : (
        user.name
      ) }
    </Container>);
};

const Container = styled(Grid)`
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
`;

const OwnerAvatar = styled(Avatar)`
    height: 32px;
    width: 32px;
`;
