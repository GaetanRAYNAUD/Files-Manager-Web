import { Breadcrumbs, Container, styled } from '@mui/material';
import React, { type FC } from 'react';
import { useIntl } from 'react-intl';
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { NodeList } from '~/components/fs/NodeList';
import { Title } from '~/components/titles/Title';
import { useGetProfileQuery } from '~/store/api/user/user.api';
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';

export const HomeCard: FC = () => {
  const profile = useAppSelector(selectProfile);
  const intl = useIntl();
  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined, { skip: profile !== undefined });

  return (
    isGetProfileLoading || !profile ?
      <AbsoluteLoader/>
      :
      <RootContainer maxWidth={ false }>
        <StyledBreadcrumbs aria-label="breadcrumb">
          <Title title={ intl.formatMessage({ id: 'fs.myFiles' }) }/>
        </StyledBreadcrumbs>
        <NodeList/>
      </RootContainer>
  );
};

const RootContainer = styled(Container)(({ theme }) => (
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: theme.spacing(3)
  }
));

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));