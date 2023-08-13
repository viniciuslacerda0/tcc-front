import { Typography, List, Stack, TextField, IconButton } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Delete, OpenInNewOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useSnackbar } from 'notistack';

import ListItem from 'components/ListItem';

import Route from 'routes/Route';

import { useUser } from 'hooks/useUser';

import styles from './styles';

interface PacientInterface {
  id: number;
  name: string;
  cpf: string;
}

const Pacient = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { user } = useUser();

  const [rows, setRows] = useState<PacientInterface[] | undefined>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearch(event.target.value);
    },
    [],
  );

  useEffect(() => {
    axios
      .get('get-pacients', {
        params: {
          doctorId: user?.id,
          name: search,
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
      rows && rows.length > 0 ? (
        rows.map(row => (
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
      <Stack justifyContent="center">
        <TextField
          name="search"
          label="Procurar"
          margin="none"
          variant="filled"
          fullWidth
          defaultValue={search}
          onChange={handleSearch}
        />
      </Stack>
      <List sx={styles.container}>{rowData}</List>
    </Stack>
  );
};

export default Pacient;
