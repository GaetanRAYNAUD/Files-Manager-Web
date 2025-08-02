import { Typography } from '@mui/material';
import React, { type FC } from 'react';

interface Props {
  title: string
}

export const Title: FC<Props> = ({ title }) => {
  return (
    <Typography variant='h5' component='h5'>
      { title }
    </Typography>
  );
};

export default Title;
