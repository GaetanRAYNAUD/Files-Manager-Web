import { Delete, Download, DriveFileMove, Edit, Share } from '@mui/icons-material';
import { CircularProgress, Grid, Paper, styled } from '@mui/material';
import {
  DataGridPro,
  GridActionsCellItem,
  type GridColDef,
  type GridDataSource,
  type GridGetRowsParams,
  type GridRowParams
} from '@mui/x-data-grid-pro';
import React, { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { type FsNodeDto, SearchNodesSort } from '~/store/api/node/fs.type';
import { useDownloadMutation, useLazySearchFsQuery } from "~/store/api/node/fs.api";
import { camelToSnakeUpperCase } from "~/utils/string.utils";
import { filesize } from "filesize";
import { ModificationBy } from "~/components/dates/ModificationBy";
import type { UserDto } from "~/store/api/user/user.type";
import { FileIcon } from "~/components/fs/FileIcon";
import { useIntl } from "react-intl";
import { FOLDER_CONTENT_TYPE } from "~/utils/constants";
import { downloadBlob } from "~/utils/download.utils";

interface Props {
  folderId?: string;
}

const pageSize = 20;

export const NodeList: FC<Props> = ({ folderId }) => {
  const [searchFs] = useLazySearchFsQuery();
  const [downloadFile] = useDownloadMutation();
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set<string>());
  const intl = useIntl();
  const gridRef = useRef<HTMLDivElement>(null);

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
  }, []);

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

  const dataSource: GridDataSource = useMemo(
    () => ({
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
              hasNextPage: data.length === pageSize,
            }
          }
        } else {
          return {
            rows: [],
            rowCount: 0,
            pageInfo: {
              hasNextPage: false,
            }
          }
        }
      }
    }), [searchFs, folderId]);

  const columns: GridColDef<FsNodeDto>[] = useMemo(() => [
    {
      type: 'string',
      field: 'name',
      headerName: intl.formatMessage({ id: 'fs.name' }),
      renderCell: ({ value, row }) =>
        <NameCell container>
          <IconCell container>
            <FileIcon contentType={ row.contentType }/>
          </IconCell>
          { value }
        </NameCell>
      ,
      filterable: false,
      flex: 6,
      minWidth: 100
    },
    {
      type: 'string',
      valueGetter: (value?: UserDto) => value?.name,
      field: 'owner',
      headerName: intl.formatMessage({ id: 'fs.owner' }),
      filterable: false,
      sortable: false,
      flex: 1
    },
    {
      type: 'string',
      renderCell: ({ row }) => <ModificationBy long={ false } node={ row }/>,
      field: 'modificationDate',
      headerName: intl.formatMessage({ id: 'fs.modification' }),
      filterable: false,
      flex: 1
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
              icon={ downloadingIds.has(params.row.id) ? <CircularProgress size={ 24 } color="inherit"/> : <Download/> }
              onClick={ () => handleDownloadClick(params.row.id, params.row.name) }
              label={ intl.formatMessage({ id: 'fs.download' }) }
              disabled={ downloadingIds.has(params.row.id) }/>
          );
        }

        actions.push(<GridActionsCellItem icon={ <Delete/> }
                                          onClick={ () => console.log('Delete') }
                                          label={ intl.formatMessage({ id: 'fs.delete' }) }/>);
        actions.push(<GridActionsCellItem icon={ <Edit/> }
                                          onClick={ () => console.log('Rename') }
                                          label={ intl.formatMessage({ id: 'fs.rename' }) }
                                          showInMenu/>);
        actions.push(<GridActionsCellItem icon={ <Share/> }
                                          onClick={ () => console.log('Share') }
                                          label={ intl.formatMessage({ id: 'fs.share' }) }
                                          showInMenu/>);
        actions.push(<GridActionsCellItem icon={ <DriveFileMove/> }
                                          onClick={ () => console.log('Move') }
                                          label={ intl.formatMessage({ id: 'fs.move' }) }
                                          showInMenu/>);

        return actions;
      },
      align: "right",
      filterable: false,
      sortable: false,
      flex: 1
    }
  ], [intl, downloadingIds]);

  return (
    <StyledPaper elevation={ 3 }>
      <StyledDataGrid
        ref={ gridRef }
        hideFooter
        columns={ columns }
        disableColumnMenu
        disableColumnReorder
        disableMultipleColumnsSorting
        disableColumnResize
        getRowId={ row => row.id }
        lazyLoading
        paginationMode="server"
        dataSource={ dataSource }
        pageSizeOptions={ [pageSize] }
        initialState={ {
          pagination: {
            paginationModel: { pageSize, page: 0 }
          },
        } }
      />
    </StyledPaper>
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

const StyledDataGrid = styled(DataGridPro<FsNodeDto>)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  }
}));