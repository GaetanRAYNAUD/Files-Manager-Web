import { Close, Download } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { type FC, useEffect, useState } from 'react';
import { useRefreshMutation } from '~/store/api/auth/auth.api';
import { endpoints, getUrl } from '~/store/api/endpoints';
import { useDownloadMutation } from '~/store/api/node/fs.api';
import type { FsNodeDto } from '~/store/api/node/fs.type';
import { selectAuthExpires } from '~/store/auth/auth.selector';
import { useAppSelector } from '~/store/hooks';
import { downloadBlob } from '~/utils/download.utils';

interface Props {
  node: FsNodeDto | null,
  handleClose?: () => void,
}

export const PreviewDialog: FC<Props> = ({ node, handleClose }) => {
  const authExpires = useAppSelector(selectAuthExpires);
  const [refresh] = useRefreshMutation();
  const [downloadFile, { isLoading: isDownloading }] = useDownloadMutation();
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (!authExpires || authExpires.getTime() - Date.now() < 5_000) {
      refresh();
    } else {
      setValid(true);
    }
  }, [authExpires, node]);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (handleClose && event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleDownloadClick = async () => {
    if (node) {
      const blob = await downloadFile(node.id).unwrap();
      downloadBlob(blob, node.name);
    }
  };

  return (
    <StyledDialog open={ !!node } onClose={ handleClose } fullWidth maxWidth="lg" fullScreen>
      { node && valid && (
        <>
          <StyledTitle>
            { node.name }
            <Grid>
              <IconButton aria-label="close" onClick={ handleDownloadClick }>
                { isDownloading ? <CircularProgress color="inherit" /> : <Download /> }
              </IconButton>
              <IconButton aria-label="close" onClick={ handleClose }>
                <Close />
              </IconButton>
            </Grid>
          </StyledTitle>
          <StyledContent dividers onClick={ handleBackgroundClick }>
            { node.contentType.startsWith('image/') && (
              <StyledImg src={ getUrl(endpoints.fs.download(node.id, true)) } alt={ node.name } />
            ) }
            { node.contentType === 'application/pdf' && (
              <StyledIframe
                src={ getUrl(endpoints.fs.download(node.id, true)) } title={ node.name }
              />
            ) }
          </StyledContent>
        </>
      ) }
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(({ theme }) => (
  {
    backgroundColor: 'transparent',
    '& .MuiDialog-paper': {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  }
));

const StyledTitle = styled(DialogTitle)(({ theme }) => (
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper
  }
));

const StyledContent = styled(DialogContent)(({ theme }) => (
  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto'
  }
));

const StyledIframe = styled('iframe')`
    width: 100%;
    height: 100%;
    border: none;
`;

const StyledImg = styled('img')`
    max-width: 100%;
    max-height: 100%;
`;