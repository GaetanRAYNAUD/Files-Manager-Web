import type { FC } from "react";
import { Box, styled, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const EmptyFolder: FC = () => {
  return (
    <StyledBox>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage id='fs.emptyFolder'/>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <FormattedMessage id='fs.uploadToFillFolder'/>
      </Typography>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme }) => (
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    textAlign: 'center',
    padding: theme.spacing(3),
  }
));