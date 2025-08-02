import { Delete, Download, DriveFileMove, Edit, Share } from '@mui/icons-material';
import { CircularProgress, Dialog, Grid, Paper, styled } from '@mui/material';
import {
  DataGridPro,
  GridActionsCellItem,
  type GridColDef,
  type GridDataSource,
  type GridGetRowsParams,
  type GridRowParams,
  type GridSortModel,
  useGridApiRef
} from '@mui/x-data-grid-pro';
import { filesize } from "filesize";
import React, { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { PreviewDialog } from '~/components/Dialogs/PreviewDialog';
import { EmptyFolder } from "~/components/fs/EmptyFolder";
import { FileIcon } from "~/components/fs/FileIcon";
import { ModificationBy } from "~/components/fs/ModificationBy";
import { RenameForm } from "~/components/fs/RenameForm";
import { UserAvatar } from "~/components/fs/UserAvatar";
import { useDownloadMutation, useLazySearchFsQuery } from "~/store/api/node/fs.api";
import { type FsNodeDto, SearchNodesSort } from '~/store/api/node/fs.type';
import { FOLDER_CONTENT_TYPE, isPreviewable } from "~/utils/constants";
import { downloadBlob } from "~/utils/download.utils";
import { camelToSnakeUpperCase } from "~/utils/string.utils";
import { DeleteConfirmation } from './DeleteConfirmation';

interface Props {
  folderId?: string;
}

interface ModalState {
  type: 'rename' | 'delete' | 'share' | null;
  row: FsNodeDto | null;
}

const pageSize = 20;
const defaultSort: GridSortModel = [{ field: 'modificationDate', sort: 'desc' }];

export const NodeList: FC<Props> = ({ folderId }) => {
  const [searchFs] = useLazySearchFsQuery();
  const [downloadFile] = useDownloadMutation();
  const intl = useIntl();
  const navigate = useNavigate();

  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set<string>());
  const [modalState, setModalState] = useState<ModalState>({ type: null, row: null });
  const [fileToPreview, setFileToPreview] = useState<FsNodeDto | null>(null);
  const [sortModel, setSortModel] = useState<GridSortModel>(defaultSort);

  const gridRef = useRef<HTMLDivElement>(null);
  const apiRef = useGridApiRef();

  useEffect(() => {
    if (gridRef.current) {
      for (const div of gridRef.current.querySelectorAll('div').values()) {
        if (div && div.style.zIndex?.length >= 2) {
          let text = '';
          for (const node of div.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
              text += node.textContent;
            }
          }

          if (text === 'MUI X Invalid license key' || text === 'MUI X Missing license key') {
            div.style.display = 'none';
          }
        }
      }
    }
  }, [folderId]);

  const handleDownloadClick = async (id: string, name: string) => {
    setDownloadingIds(prevIds => new Set(prevIds).add(id));

    try {
      const blob = await downloadFile(id).unwrap();

      downloadBlob(blob, name);
    } finally {
      setDownloadingIds(prevIds => {
        const newIds = new Set(prevIds);
        newIds.delete(id);
        return newIds;
      });
    }
  };

  const handleCloseModal = () => {
    setModalState({ type: null, row: null });
  };

  const handleCloseDeleteModal = async (row?: FsNodeDto) => {
    if (row && apiRef.current) {
      apiRef.current.updateRows([{ id: row.id, _action: 'delete' }]);
    }

    handleCloseModal();
  };

  const handleCloseUpdateModal = async (row?: FsNodeDto) => {
    if (row && apiRef.current) {
      apiRef.current.updateRows([row]);
    }

    handleCloseModal();
  };

  const handleClosePreview = () => {
    setFileToPreview(null);
  };

  const handleRowDoubleClick = (params: GridRowParams<FsNodeDto>) => {
    if (params.row.contentType === FOLDER_CONTENT_TYPE) {
      navigate(`/folders/${ params.row.id }`);
    } else if (isPreviewable(params.row.contentType)) {
      setFileToPreview(params.row);
    }
  };

  const dataSource: GridDataSource = useMemo(
    () => (
      {
        getRows: async ({ paginationModel, sortModel }: GridGetRowsParams) => {
          let sort;

          if (sortModel && sortModel.length > 0 && sortModel[0].sort) {
            sort = camelToSnakeUpperCase(sortModel[0].field) + '_' + sortModel[0].sort.toUpperCase();
          }

          const { data, isSuccess } = await searchFs({
                                                       page: paginationModel?.page ?? 0,
                                                       id: folderId,
                                                       sort: sort as SearchNodesSort
                                                     });

          if (isSuccess) {
            return {
              rows: data,
              rowCount: -1,
              pageInfo: {
                hasNextPage: data.length === pageSize
              }
            };
          } else {
            return {
              rows: [],
              rowCount: 0,
              pageInfo: {
                hasNextPage: false
              }
            };
          }
        }
      }
    ), [searchFs, folderId]);

  const columns: GridColDef<FsNodeDto>[] = useMemo(() => [
    {
      type: 'string',
      field: 'name',
      headerName: intl.formatMessage({ id: 'fs.name' }),
      renderCell: ({ value, row }) =>
        <NameCell container>
          <IconCell container>
            <FileIcon contentType={ row.contentType } />
          </IconCell>
          { value }
        </NameCell>
      ,
      filterable: false,
      flex: 5,
      minWidth: 100
    },
    {
      type: 'string',
      renderCell: ({ value }) => <UserAvatar user={ value } />,
      field: 'owner',
      headerName: intl.formatMessage({ id: 'fs.owner' }),
      filterable: false,
      sortable: false,
      flex: 1
    },
    {
      type: 'string',
      renderCell: ({ row }) => <ModificationBy long={ false } node={ row } />,
      field: 'modificationDate',
      headerName: intl.formatMessage({ id: 'fs.modification' }),
      filterable: false,
      flex: 2
    },
    {
      type: 'string',
      valueGetter: value => value ? filesize(value) : undefined,
      field: 'size',
      headerName: intl.formatMessage({ id: 'fs.size' }),
      filterable: false,
      sortable: false,
      flex: 1
    },
    {
      type: 'actions',
      field: 'id',
      headerName: '',
      getActions: (params: GridRowParams<FsNodeDto>) => {
        const actions = [];
        /*Todo filter depending on rights*/

        if (params.row.contentType !== FOLDER_CONTENT_TYPE) {
          actions.push(
            <GridActionsCellItem
              icon={ downloadingIds.has(params.row.id) ? <CircularProgress size={ 24 } color="inherit" /> : <Download /> }
              onClick={ () => handleDownloadClick(params.row.id, params.row.name) }
              label={ intl.formatMessage({ id: 'fs.download' }) }
              disabled={ downloadingIds.has(params.row.id) }
            />
          );
        }

        actions.push(<GridActionsCellItem
          icon={ <Delete /> }
          onClick={ () => setModalState({ type: 'delete', row: params.row }) }
          label={ intl.formatMessage({ id: 'common.delete' }) }
        />);
        actions.push(<GridActionsCellItem
          icon={ <Edit /> }
          onClick={ () => setModalState({ type: 'rename', row: params.row }) }
          label={ intl.formatMessage({ id: 'fs.rename' }) }
          showInMenu
        />);
        actions.push(<GridActionsCellItem
          icon={ <Share /> }
          onClick={ () => console.log('Share') }
          label={ intl.formatMessage({ id: 'fs.share' }) }
          disabled
          showInMenu
        />);
        actions.push(<GridActionsCellItem
          icon={ <DriveFileMove /> }
          onClick={ () => console.log('Move') }
          label={ intl.formatMessage({ id: 'fs.move' }) }
          disabled
          showInMenu
        />);

        return actions;
      },
      align: "right",
      filterable: false,
      sortable: false,
      flex: 1,
      minWidth: 126
    }
  ], [intl, downloadingIds, folderId]);

  return (
    <>
      <StyledPaper elevation={ 3 }>
        <StyledDataGrid
          key={ `node-list-${ folderId }` }
          ref={ gridRef }
          apiRef={ apiRef }
          hideFooter
          columns={ columns }
          disableColumnMenu
          disableColumnReorder
          disableMultipleColumnsSorting
          disableColumnResize
          getRowId={ row => row.id }
          onRowDoubleClick={ handleRowDoubleClick }
          lazyLoading
          paginationMode="server"
          dataSource={ dataSource }
          pageSizeOptions={ [pageSize] }
          sortModel={ sortModel }
          onSortModelChange={ (newSortModel) => setSortModel(newSortModel.length > 0 ? newSortModel : defaultSort) }
          initialState={ {
            pagination: {
              paginationModel: { pageSize, page: 0 }
            }
          } }
          slots={ {
            noRowsOverlay: EmptyFolder
          } }
        />
      </StyledPaper>
      <Dialog
        open={ modalState.type !== null } onClose={ handleCloseModal } fullWidth maxWidth="sm"
      >
        { modalState.row && (
          <>
            { modalState.type === 'rename' && <RenameForm data={ modalState.row } onClose={ handleCloseUpdateModal } /> }
            { modalState.type === 'delete' &&
              <DeleteConfirmation data={ modalState.row } onClose={ handleCloseDeleteModal } /> }
          </>
        ) }
      </Dialog>
      <PreviewDialog node={ fileToPreview } handleClose={ handleClosePreview } />
    </>
  );
};

const StyledPaper = styled(Paper)({
                                    width: '100%',
                                    overflow: 'hidden'
                                  });

const NameCell = styled(Grid)`
    align-items: center;
`;

const IconCell = styled(Grid)(({ theme }) => (
  {
    paddingRight: theme.spacing(1),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
));

const StyledDataGrid = styled(DataGridPro<FsNodeDto>)(
  ({ theme }) => (
    {
      '& .MuiDataGrid-columnHeaders': {
        borderBottom: '1px solid',
        borderColor: theme.palette.divider
      },
      '& .MuiDataGrid-cell:focus': {
        outline: 'none'
      },
      '& .MuiDataGrid-cell:focus-within': {
        outline: 'none'
      },
      "& .MuiDataGrid-columnHeader:focus": {
        outline: "none"
      }
    }
  ));