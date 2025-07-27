import { type FC, useState } from "react";
import type { FsNodeDto } from "~/store/api/node/fs.type";
import { useRenameMutation } from "~/store/api/node/fs.api";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Typography
} from "@mui/material";
import { FormattedMessage } from "react-intl";

interface EditFormProps {
  data: FsNodeDto;
  onClose: (node?: FsNodeDto) => void;
}

export const RenameForm: FC<EditFormProps> = ({ data, onClose }) => {
  const [name, setName] = useState(data.name);
  const [updateFile, { isLoading }] = useRenameMutation();

  const handleSave = async () => {
    let node;

    if (name !== data.name) {
      node = await updateFile({ id: data.id, name }).unwrap();
    } else {
      node = data;
    }

    onClose(node);
  };

  return (
    <>
      <DialogTitle>
        <FormattedMessage id="fs.rename"/>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={ { mt: 1 } }>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="outlined"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            disabled={ isLoading }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => onClose(undefined) } disabled={ isLoading }>
          <FormattedMessage id="common.cancel"/>
        </Button>
        <Button
          onClick={ handleSave }
          variant="contained"
          disabled={ isLoading }
          startIcon={ isLoading ? <CircularProgress size={ 20 } color="inherit"/> : null }
        >
          <FormattedMessage id={ isLoading ? 'common.saving' : 'common.save' }/>
        </Button>
      </DialogActions>
    </>
  );
};

const Bold = styled(Typography)`
    font-weight: bold;
`;