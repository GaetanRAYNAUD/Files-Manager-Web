import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export const AbsoluteLoader: React.FC = () => {
  return (
    <div>
      <CircularProgress size={42} />
    </div>
  );
};
