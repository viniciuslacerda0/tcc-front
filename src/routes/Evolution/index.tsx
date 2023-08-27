/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-magic-numbers */
import { Box, Typography, List, Stack, TextField, Button } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import ListItem from 'components/ListItem';

import { useModal } from 'hooks/useModal';

import Pagination from 'components/Pagination';

import styles from './styles';
import EvolutionModal from './EvolutionModal';

interface EvolutionInterface {
  totalCount: number;
  evolutions: {
    id: number;
    name: string;
    text: string;
    created_at: string;
    pictures: string[];
  }[];
}

interface EvolutionForm {
  created_at: string;
  name: string;
  text: string;
  id: number;
  pictures: string[];
}

const Evolution = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { state } = useLocation();
  const [initialDate, setInitialDate] = useState('');
  const [search, setSearch] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const { isOpen, handleClose, handleOpen } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState<EvolutionInterface | undefined>();

  const [evolutionFormState, setEvolutionFormState] = useState<
    EvolutionForm | undefined
  >();

  const setGroupFormStateHandler = useCallback(
    (newFormState: EvolutionForm | undefined) => {
      setEvolutionFormState(newFormState);
      handleOpen();
    },
    [handleOpen],
  );

  const getFilter = useCallback(() => {
    let filter = { filter: {} };
    if (initialDate) {
      filter = {
        filter: {
          from: new Date(initialDate),
        },
      };
    }
    if (finalDate) {
      filter = {
        filter: {
          ...filter.filter,
          until: new Date(finalDate),
        },
      };
    }

    if (search) {
      filter = {
        filter: {
          ...filter.filter,
          textFilter: search,
        },
      };
    }
    return filter;
  }, [finalDate, initialDate, search]);

  const handlePagination = useCallback(
    (value: number) => {
      if (!rows?.evolutions) return;
      if (value === page) return;

      const { evolutions } = rows;
      let cursor;
      let backwards = false;
      if (value > page) {
        cursor = evolutions[evolutions.length - 1]?.id ?? 0;
      } else {
        cursor = evolutions[0]?.id ?? 0;
        backwards = true;
      }

      const filter = getFilter();
      axios
        .get('get-evolution', {
          params: {
            ...filter,
            pacientId: state.id,
            cursor,
            backwards,
          },
        })
        .then(response => {
          setRows(response.data);
          setPage(value);
        })
        .catch(() =>
          enqueueSnackbar('Ocorreu um erro ao resgatar evolucao', {
            variant: 'error',
          }),
        );
    },
    [enqueueSnackbar, getFilter, page, rows, state.id],
  );

  useEffect(() => {
    axios
      .get('get-evolution', {
        params: {
          pacientId: state.id,
        },
      })
      .then(response => {
        setRows(response.data);
        setPage(1);
      })
      .catch(() =>
        enqueueSnackbar('Ocorreu um erro ao resgatar evolucao', {
          variant: 'error',
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = useCallback(() => {
    const filter = getFilter();
    axios
      .get('get-evolution', {
        params: {
          pacientId: state.id,
          ...filter,
        },
      })
      .then(response => {
        setRows(response.data);
        setPage(1);
      })
      .catch(() =>
        enqueueSnackbar('Ocorreu um erro ao resgatar evolucao', {
          variant: 'error',
        }),
      );
  }, [enqueueSnackbar, getFilter, state.id]);

  const rowData = useMemo(
    () =>
      rows?.evolutions && rows?.evolutions.length > 0 ? (
        rows?.evolutions.map(row => (
          <ListItem key={row.id}>
            <Box onClick={(): void => setGroupFormStateHandler(row)}>
              <Typography>{row.name}</Typography>
              <Typography>
                {new Date(row.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </ListItem>
        ))
      ) : (
        <Typography>Nenhum dado encontrado para esse relatorio</Typography>
      ),
    [rows, setGroupFormStateHandler],
  );

  const handleInitialDate = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setInitialDate(event.target.value);
    },
    [],
  );

  const handleFinalDate = useCallback(
    (event: ChangeEvent<{ value: string; name: string }>): void => {
      setFinalDate(event.target.value);
    },
    [],
  );

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearch(event.target.value);
    },
    [],
  );

  return (
    <Stack width="90%">
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="flex-end"
        gap={1}
        alignItems="flex-end"
      >
        <TextField
          name="search"
          label="Procurar"
          margin="none"
          variant="filled"
          fullWidth
          defaultValue={search}
          onChange={handleSearch}
        />
        <Stack flexDirection="column">
          <Typography>De:</Typography>
          <TextField
            type="date"
            name="initialDate"
            margin="none"
            variant="filled"
            defaultValue={initialDate}
            onChange={handleInitialDate}
          />
        </Stack>
        <Stack flexDirection="column">
          <Typography>Para:</Typography>
          <TextField
            type="date"
            name="finalDate"
            margin="none"
            variant="filled"
            defaultValue={finalDate}
            onChange={handleFinalDate}
          />
        </Stack>
        <Button variant="contained" onClick={handleFilter}>
          Filtrar
        </Button>
      </Stack>
      <List sx={styles.container}>{rowData}</List>
      <EvolutionModal
        isOpen={isOpen}
        handleClose={handleClose}
        data={evolutionFormState}
      />
      {rows?.totalCount && rows.totalCount > 0 ? (
        <Pagination
          total={Math.ceil(rows.totalCount / 5)}
          page={page}
          onChange={handlePagination}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default Evolution;
