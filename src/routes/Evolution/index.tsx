import { Box, Typography, List } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import ListItem from 'components/ListItem';

import styles from './styles';

interface EvolutionInterface {
  id: number;
  name: string;
  created_at: string;
}

interface EvolutionForm {
  created_at: string;
  name: string;
  id: number;
}

const mockData: EvolutionInterface[] = [
  {
    id: 1,
    name: 'Evolution 1',
    created_at: '2023-07-01',
  },
  {
    id: 2,
    name: 'Evolution 2',
    created_at: '2023-07-02',
  },
  {
    id: 3,
    name: 'Evolution 3',
    created_at: '2023-07-03',
  },
  {
    id: 4,
    name: 'Evolution 4',
    created_at: '2023-07-04',
  },
  {
    id: 5,
    name: 'Evolution 5',
    created_at: '2023-07-05',
  },
  {
    id: 6,
    name: 'Evolution 6',
    created_at: '2023-07-06',
  },
  {
    id: 7,
    name: 'Evolution 7',
    created_at: '2023-07-07',
  },
  {
    id: 8,
    name: 'Evolution 8',
    created_at: '2023-07-08',
  },
  {
    id: 9,
    name: 'Evolution 9',
    created_at: '2023-07-09',
  },
  {
    id: 10,
    name: 'Evolution 10',
    created_at: '2023-07-10',
  },
];

const Evolution = (): JSX.Element => {
  const [evolutions, setEvolutions] = useState<
    EvolutionInterface[] | undefined
  >(mockData);
  const [rows, setRows] = useState<EvolutionInterface[] | undefined>(mockData);

  const [evolutionFormState, setEvolutionFormState] = useState<
    EvolutionForm | undefined
  >();

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {},
    [],
  );

  const setGroupFormStateHandler = useCallback(
    (newFormState: EvolutionForm | undefined) => {
      setEvolutionFormState(newFormState);
    },
    [],
  );

  const rowData = useMemo(
    () =>
      rows?.map(row => (
        // Add onClick to open Modal
        <ListItem key={row.id}>
          <Box>
            <Typography>{row.name}</Typography>
            <Typography>
              {new Date(row.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </ListItem>
      )),
    [rows],
  );

  return <List sx={styles.container}>{rowData}</List>;
};

export default Evolution;
