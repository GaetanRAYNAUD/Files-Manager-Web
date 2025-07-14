import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export const AbsoluteLoader: React.FC = () => {
  return (
    <CircularProgress size={ 42 } sx={ { placeSelf: 'center' } }/>
  );
};
