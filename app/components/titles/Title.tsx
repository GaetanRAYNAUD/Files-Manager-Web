import { styled, Typography } from '@mui/material';
import React, { type FC } from 'react';

interface Props {
  title: string
}

export const Title: FC<Props> = ({ title }) => {
  return (
    <TitleTypography variant='h5'>
      { title }
    </TitleTypography>
  );
};

const TitleTypography = styled(Typography)(({ theme }) => (
  {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    component: 'h5'
  }
));
