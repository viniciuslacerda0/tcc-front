import { Typography, List, Stack, TextField, IconButton } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { Delete, OpenInNewOutlined } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

import ListItem from 'components/ListItem';

import Route from 'routes/Route';

import styles from './styles';

interface PacientInterface {
  id: number;
  name: string;
  cpf: string;
}

const mockData: PacientInterface[] = [
  {
    id: 1,
    name: 'Name 1',
    cpf: '111.111.111-00',
  },
  {
    id: 2,
    name: 'Name 2',
    cpf: '111.111.111-00',
  },
  {
    id: 3,
    name: 'Name 3',
    cpf: '111.111.111-00',
  },
  {
    id: 4,
    name: 'Name 4',
    cpf: '111.111.111-00',
  },
  {
    id: 5,
    name: 'Name 5',
    cpf: '111.111.111-00',
  },
];

const Pacient = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const [rows, setRows] = useState<PacientInterface[] | undefined>(mockData);

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearch(event.target.value);
    },
    [],
  );

  const goToPacient = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      navigate(Route.PACIENTMENU, { state: { id: event.currentTarget.name } });
    },
    [navigate],
  );

  const removeUser = useCallback(() => {}, []);

  const rowData = useMemo(
    () =>
      rows?.map(row => (
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
              <IconButton name={`${row.id}`} onClick={goToPacient}>
                <OpenInNewOutlined />
              </IconButton>
              <IconButton onClick={removeUser}>
                <Delete color="error" />
              </IconButton>
            </Stack>
          </Stack>
        </ListItem>
      )),
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
