import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Button, Container, styled } from '@mui/material';
import React, { type FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from "react-router";
import { AbsoluteLoader } from '~/components/AbsoluteLoader';
import { NodeList } from "~/components/fs/NodeList";
import { Title } from "~/components/titles/Title";
import { useGetFsQuery } from "~/store/api/node/fs.api";
import { useAppSelector } from '~/store/hooks';
import { selectProfile } from '~/store/user/user.selector';
import { FOLDER_CONTENT_TYPE } from "~/utils/constants";
import type { Route } from "./+types/Folder";

const Folder: FC<Route.ComponentProps> = ({ params }) => {
  const profile = useAppSelector(selectProfile);
  const intl = useIntl();
  const navigate = useNavigate();
  const { id } = params;
  const { data, isLoading, isError } = useGetFsQuery(id);

  useEffect(() => {
    if (data) {
      document.title = intl.formatMessage({ id: 'common.title' }, { name: data.name });
    } else {
      document.title = intl.formatMessage({ id: 'common.simpleTitle'});
    }
  }, [data]);

  if (!profile || (isLoading && !isError)) {
    return <AbsoluteLoader />;
  }

  //Todo handle My files vs shared with me when available

  return (
    (
      isError || !data || data.contentType !== FOLDER_CONTENT_TYPE
    ) ?
    <RootContainer maxWidth={ false }>
      <Title title={ intl.formatMessage({ id: 'fs.unknownFolder' }) } />
    </RootContainer>
      :
    <RootContainer maxWidth={ false }>
      {
        data.breadcrumbs &&
        <StyledBreadcrumbs
          separator={ <NavigateNext fontSize="small" /> } maxItems={ 3 } itemsAfterCollapse={ 2 } aria-label="breadcrumb"
        >
          <Button color="inherit" href={ `/` }>
            <Title title={ intl.formatMessage({ id: 'fs.myFiles' }) } />
          </Button>
          {
            data.breadcrumbs
                .slice(0, data.breadcrumbs.length - 1)
                .map((item) => (
                  <Button
                    color="inherit" key={ item.id } onClick={ () => navigate(`/folders/${ item.id }`) }
                  >
                    <Title title={ item.name } />
                  </Button>
                ))
          }
          <Button color="inherit">
            <Title title={ data.name } />
          </Button>
        </StyledBreadcrumbs>
      }
      <NodeList folderId={ id } />
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

const StyledBreadcrumbs = styled(Breadcrumbs)(
  ({ theme }) => (
    {
      marginBottom: theme.spacing(1)
    }
  ));

export default Folder;
