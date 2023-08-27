/* eslint-disable no-magic-numbers */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Typography,
  List,
  Stack,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Delete, OpenInNewOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useSnackbar } from 'notistack';

import ListItem from 'components/ListItem';

import Pagination from 'components/Pagination';

import Route from 'routes/Route';

import { useUser } from 'hooks/useUser';

import styles from './styles';

interface PacientInterface {
  totalCount: number;
  pacients: {
    id: number;
    name: string;
    cpf: string;
  }[];
}

const Pacient = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { user } = useUser();

  const [rows, setRows] = useState<PacientInterface | undefined>();
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearch(event.target.value);
    },
    [],
  );

  const getFilter = useCallback(() => {
    let filter;
    if (search) {
      filter = {
        filter: {
          name: search,
        },
      };
    }
    return filter;
  }, [search]);

  const fetchSearch = useCallback(() => {
    const filter = getFilter();

    axios
      .get('get-pacients', {
        params: {
          ...filter,
          doctorId: user?.id,
        },
      })
      .then(response => {
        setRows(response.data);
        setPage(1);
      })
      .catch(() => {
        enqueueSnackbar('Ocorreu um erro ao resgatar pacientes', {
          variant: 'error',
        });
      });
  }, [enqueueSnackbar, getFilter, user?.id]);

  const handlePagination = useCallback(
    (value: number) => {
      if (!rows?.pacients) return;
      if (value === page) return;

      const { pacients } = rows;
      let cursor;
      let backwards = false;
      if (value > page) {
        cursor = pacients[pacients.length - 1]?.id ?? 0;
      } else {
        cursor = pacients[0]?.id ?? 0;
        backwards = true;
      }
      const filter = getFilter();
      axios
        .get('get-pacients', {
          params: {
            ...filter,
            doctorId: user?.id,
            cursor,
            backwards,
          },
        })
        .then(response => {
          setRows(response.data);
          setPage(value);
        })
        .catch(() => {
          enqueueSnackbar('Ocorreu um erro ao resgatar pacientes', {
            variant: 'error',
          });
        });
    },
    [enqueueSnackbar, getFilter, page, rows, user?.id],
  );

  useEffect(() => {
    axios
      .get('get-pacients', {
        params: {
          doctorId: user?.id,
        },
      })
      .then(response => {
        setRows(response.data);
      })
      .catch(() => {
        enqueueSnackbar('Ocorreu um erro ao resgatar pacientes', {
          variant: 'error',
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPacient = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      navigate(Route.PACIENTMENU, {
        state: { id: event.currentTarget.name, name: event.currentTarget.id },
      });
    },
    [navigate],
  );

  const removeUser = useCallback(() => {}, []);

  const rowData = useMemo(
    () =>
      rows?.pacients && rows.pacients.length > 0 ? (
        rows.pacients.map(row => (
          <ListItem key={row.id}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography variant="body2">{row.cpf}</Typography>
              <Typography>{row.name}</Typography>
              <Stack flexDirection="row">
                <IconButton
                  name={`${row.id}`}
                  id={row.name}
                  onClick={goToPacient}
                >
                  <OpenInNewOutlined />
                </IconButton>
                <IconButton onClick={removeUser}>
                  <Delete color="error" />
                </IconButton>
              </Stack>
            </Stack>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Typography variant="body2">Nenhum paciente encontrado</Typography>
          </Stack>
        </ListItem>
      ),
    [goToPacient, removeUser, rows],
  );

  return (
    <Stack width="90%">
      <Stack justifyContent="center" flexDirection="row">
        <TextField
          name="search"
          label="Procurar"
          margin="none"
          variant="filled"
          fullWidth
          defaultValue={search}
          onChange={handleSearch}
        />
        <Button variant="contained" onClick={fetchSearch}>
          Filtrar
        </Button>
      </Stack>
      <List sx={styles.container}>{rowData}</List>
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

export default Pacient;
