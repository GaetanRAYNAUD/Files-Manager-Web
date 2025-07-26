import { Search as SearchIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  debounce,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  Typography
} from '@mui/material';
import React, { type FC, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ModificationBy } from '~/components/dates/ModificationBy';
import { FileIcon } from '~/components/fs/FileIcon';
import { useSearchFsQuery } from '~/store/api/node/fs.api';
import { FOLDER_CONTENT_TYPE } from '~/utils/constants';

export const HeaderSearchbar: FC = () => {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isResultsOpen, setResultsOpen] = useState<boolean>(false);

  const { data: results, isLoading, isSuccess } = useSearchFsQuery(
    { q: searchTerm },
    { skip: !searchTerm }
  );

  const showResults = isResultsOpen && isSuccess && searchTerm;

  const debouncedSetSearchTerm = useMemo(() => debounce((v: string) => setSearchTerm(v), 300), []);
  useEffect(() => () => debouncedSetSearchTerm.clear(), [debouncedSetSearchTerm]);

  return (
    <SearchWrapper>
      <ClickAwayListener onClickAway={ () => setResultsOpen(false) }>
        <Search>
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={ intl.formatMessage({ id: 'home.search' }) }
            inputProps={ { 'aria-label': 'search' } }
            onChange={ (e) => debouncedSetSearchTerm(e.target.value.trim()) }
            onFocus={ () => setResultsOpen(true) }
          />
          {
            showResults && (
              <ResultsWrapper elevation={ 4 }>
                <List dense>
                  { isLoading ? (
                    <ResultListItem>
                      <CircularProgress size={ 24 }/>
                    </ResultListItem>
                  ) : (
                    results?.map((item) => {
                      const modificationDate = new Date(item.modificationDate);
                      const today = new Date();

                      const modifiedToday = modificationDate.getDate() === today.getDate() &&
                        modificationDate.getMonth() === today.getMonth() &&
                        modificationDate.getFullYear() === today.getFullYear();

                      return (
                        <ListItemButton
                          key={ item.id }
                          component='a'
                          href={ `/${ item.contentType === FOLDER_CONTENT_TYPE ? 'folder' : 'item' }/${ item.id }` }
                        >
                          <ListItemIcon>
                            <Avatar>
                              <FileIcon contentType={ item.contentType }/>
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={ item.name }
                            secondary={ <ModificationBy node={ item }/> }
                          />
                        </ListItemButton>
                      );
                    })
                  ) }
                  { !isLoading && results?.length === 0 && (
                    <ListItem>
                      <ListItemText
                        primary={
                          <NoResultTypo variant='body2'>
                            <FormattedMessage id='home.search.noResult' values={ { q: searchTerm } }/>
                          </NoResultTypo>
                        }
                      />
                    </ListItem>
                  ) }
                </List>
              </ResultsWrapper>
            )
          }
        </Search>
      </ClickAwayListener>
    </SearchWrapper>
  );
};

const SearchWrapper = styled(Box)`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = styled('div')(({ theme }) => (
  {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.custom.background.secondary.default,
    margin: theme.spacing(0, 2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  }
));

const SearchIconWrapper = styled('div')(({ theme }) => (
  {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
));

const StyledInputBase = styled(InputBase)(({ theme }) => (
  {
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${ theme.spacing(4) })`,
      transition: theme.transitions.create('width')
    }
  }
));

const ResultsWrapper = styled(Paper)(({ theme }) => (
  {
    position: 'absolute',
    width: '100%',
    top: '100%',
    left: 0,
    backgroundColor: theme.custom.background.secondary.default,
    zIndex: 1200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    clipPath: 'inset(0px -15px -15px -15px)'
  }
));

const ResultListItem = styled(ListItem)(({ theme }) => (
  {
    display: 'flex',
    justifyContent: 'center',
    p: theme.spacing(2)
  }
));

const NoResultTypo = styled(Typography)(({ theme }) => (
  {
    color: theme.palette.text.secondary,
    align: 'center'
  }
));