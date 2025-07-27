import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography
} from "@mui/material";
import type { FC } from "react";
import type { FsNodeDto } from "~/store/api/node/fs.type";
import { useDeleteMutation } from "~/store/api/node/fs.api";
import { FormattedMessage } from "react-intl";

interface DeleteConfirmationProps {
  data: FsNodeDto;
  onClose: (data?: FsNodeDto) => void;
}

export const DeleteConfirmation: FC<DeleteConfirmationProps> = ({ data, onClose }) => {
  const [deleteFile, { isLoading }] = useDeleteMutation();

  const handleDelete = async () => {
    await deleteFile(data.id).unwrap();
    onClose(data);
  };

  return (
    <>
      <DialogTitle>
        <FormattedMessage id="common.delete"/><Bold variant="h6" component="span"> { data.name } </Bold>?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="fs.confirmDelete"/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => onClose(undefined) } disabled={ isLoading }>
          <FormattedMessage id="common.cancel"/>
        </Button>
        <Button
          onClick={ handleDelete }
          color="error"
          variant="contained"
          disabled={ isLoading }
          startIcon={ isLoading ? <CircularProgress size={ 20 } color="inherit"/> : null }
        >
          <FormattedMessage id={ isLoading ? 'common.deleting' : 'common.delete' }/>
        </Button>
      </DialogActions>
    </>
  );
};

const Bold = styled(Typography)`
    font-weight: bold;
`;